import { Chart, registerables } from 'chart.js';
import { ChartJsData } from './data-elements/ChartJsData.js';
import { ChartJsDataset } from './data-elements/ChartJsDataset.js';
import {
    chartColor,
    getActiveIndex,
    isDataElement,
    isDatasetElement,
    isLegendElement,
    isScaleElement,
    isSubtitleElement,
    isTitleElement,
    waitForInitialization,
} from './util.js';

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
    display: block;
    width: var(--chart-width);
    max-width: var(--chart-width);
    height: var(--chart-height);
    max-height: var(--chart-height);
}

</style>

<canvas></canvas>
<slot></slot>
`;

/**
 * @class
 * @extends HTMLElement
 * @mixes LegendMixin
 * */
export class ChartJsElement extends HTMLElement {
    constructor() {
        super();

        this.width = 'auto';
        this.height = 'auto';

        const root = this.attachShadow({ mode: 'open' });
        root.appendChild(template.content.cloneNode(true));

        this.slotElement = root.querySelector('slot');
        this.canvas = this.shadowRoot.querySelector('canvas');
        this.label = '';
        this.chart = null;
        this.observer = null;
        /** @type import('chart.js').ChartType */
        this.type = 'bar';

        this.datasetElements = [];
        /** @type import('chart.js').ChartData */
        this.chartData = {
            labels: [],
            datasets: [],
        };
        /** @type import('chart.js').ChartOptions */
        this.options = {
            responsive: this.responsive,
            maintainAspectRatio: this.maintainAspectRatio,
            aspectRatio: this.aspectRatio,
            layout: {
                padding: this.padding,
            },
            plugins: {},
            scales: {},
        };

        Chart.register(...registerables);
    }

    connectedCallback() {
        this.createChart();
        this._addObserver();
    }

    _addObserver() {
        const observerConfig = { attributes: true, childList: true, subtree: true };
        this.observer = new MutationObserver(this._onChange.bind(this));
        this.observer.observe(this, observerConfig);
    }

    /**
     * @param {MutationRecord[]} mutationList
     * @param {MutationObserver} observer
     */
    _onChange(mutationList, observer) {
        this.updateChart(mutationList);
    }

    _getDataElements() {
        return Array.from(this.children).filter(isDataElement);
    }

    _getDatasetElements() {
        return Array.from(this.children).filter(isDatasetElement);
    }

    _getTitleElement() {
        return Array.from(this.children).filter(isTitleElement)[0];
    }

    _getSubtitleElement() {
        return Array.from(this.children).filter(isSubtitleElement)[0];
    }

    _getScaleElements() {
        return Array.from(this.children).filter(isScaleElement);
    }

    _getLegendElement() {
        return Array.from(this.children).filter(isLegendElement)[0];
    }

    /**
     * @param {MutationRecord[]} mutationList
     */
    _parseChartData(mutationList = []) {
        this._parseRemovals(mutationList);
        this._parseOptions();
        this._parseDatasets();
        this._parseLegend();
    }

    _parseOptions() {
        this.options.indexAxis = this.indexAxis;

        const titleElement = this._getTitleElement();
        if (titleElement) {
            this.options.plugins.title = titleElement.asData();
        }
        const subtitleElement = this._getSubtitleElement();
        if (subtitleElement) {
            this.options.plugins.subtitle = subtitleElement.asData();
        }

        const scaleElements = this._getScaleElements();
        if (scaleElements.length > 0) {
            scaleElements.forEach(el => {
                this.options.scales[el.type] = el.asData();
            });
        }
        console.log(this.options.scales);
    }

    /**
     * @param {MutationRecord[]} mutationList
     */
    _parseRemovals(mutationList) {
        const removedDatasets = mutationList
            .reduce((allList, mut) => (allList = [...allList, ...mut.removedNodes]), [])
            .filter(isDatasetElement);
        removedDatasets.forEach(() => {
            // Quick and dirty way to make the system update datas.
            // Maybe find a better way to do this later on
            this.chart.data.datasets.pop();
        });

        const datasetsWithRemovedData = mutationList.filter(
            mut =>
                mut.type === 'childList' &&
                Array.from(mut.removedNodes).some(node => node instanceof HTMLElement) &&
                isDatasetElement(mut.target),
        );
        datasetsWithRemovedData.forEach(ds => {
            const chartDataset = this.chart.data.datasets[/** @type ChartJsDataset */ (ds.target).index];
            chartDataset.data.pop();
            // @ts-ignore
            chartDataset.backgroundColor.pop();
            // @ts-ignore
            chartDataset.borderColor.pop();

            const maxDataLength = this.chart.data.datasets.reduce((max, ds) => {
                return Math.max(max, ds.data.length);
            }, 0);

            while (this.chart.data.labels.length > maxDataLength) {
                this.chart.data.labels.pop();
            }
        });
    }

    _parseLegend() {
        const legendElement = this._getLegendElement();
        if (!legendElement) return;

        this.options.plugins.legend = legendElement.asData();
    };

    _parseDatasets() {
        /** @type Element[] */
        const datasets = this._getDatasetElements();
        if (datasets.length <= 0) {
            // For single dataset instances, where you don't need to have a dataset
            datasets.push(this);
        }
        datasets.forEach((dataset, i) => {
            this._parseDataset(dataset, i, true);
        });
    }

    /**
     * @param {Element} datasetElement
     * @param {number} datasetIndex
     * @param {boolean} multiDataset
     */
    _parseDataset(datasetElement, datasetIndex, multiDataset) {
        const dataElements = Array.from(datasetElement.children).filter(isDataElement);
        const labels = this.chart?.data?.labels ?? [];
        let dataset = this._getOrSetDataset(datasetElement, datasetIndex);

        for (let i = 0; i < dataElements.length; i++) {
            const activeIndex = getActiveIndex(this.type, multiDataset, datasetIndex, i);

            let dataEl = /** @type ChartJsData */ (dataElements[i]);
            const oldDataEl = this.datasetElements[datasetIndex].dataElements[i];
            if (dataEl === oldDataEl) {
                dataEl = oldDataEl;
            }

            labels[i] = dataEl.label;
            dataset.data[i] = dataEl.data;
            dataset.backgroundColor[i] = dataEl.backgroundColor ?? chartColor(activeIndex);
            dataset.borderColor[i] = dataEl.borderColor ?? chartColor(activeIndex, false);
        }
        this.datasetElements[datasetIndex] = {
            element: datasetElement,
            dataElements,
        };
    }

    /**
     * @param {ChartJsDataset | Element} datasetElement
     * @param {number} index
     */
    _getOrSetDataset(datasetElement, index) {
        let dataset = this.chart?.data?.datasets[index];

        if (!dataset || this.datasetElements[index]?.element !== datasetElement) {
            dataset = {
                label: isDatasetElement(datasetElement) ? datasetElement.label : this.label,
                data: [],
                backgroundColor: [],
                borderColor: [],
                tension: isDatasetElement(datasetElement) ? datasetElement.tension : 0,
            };
            if (isDatasetElement(datasetElement)) {
                datasetElement.index = index;
                if (datasetElement.type) {
                    dataset.type = datasetElement.type;
                }
            }
            this.datasetElements[index] = {
                element: datasetElement,
                dataElements: [],
            };
            this.chart.data.datasets[index] = dataset;
        }
        return dataset;
    }

    /**
     * @param {MutationRecord[]} [mutationList]
     */
    async updateChart(mutationList) {
        if (!this.chart || !this.chart.attached) {
            await this.createChart();
        }
        this._parseChartData(mutationList);
        this.chart.update();
    }

    async createChart() {
        await waitForInitialization(Array.from(this.children));
        if (this.chart?.attached) {
            this.chart.destroy();
        }

        const ctx = this.canvas.getContext('2d');
        this.chart = new Chart(ctx, {
            type: this.type,
            data: this.chartData,
            options: this.options,
        });
        this.updateChart();
    }

    /**
     * @param {string} name
     * @param {string} oldValue
     * @param {string} newValue
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        switch (name) {
            default:
                this[name] = newValue;
        }
    }

    static get observedAttributes() {
        return [
            'type',
            'label',
            'height',
            'width',
            'padding',
            'no-responsive',
            'no-maintain-aspect-ratio',
            'aspect-ratio',
            'index-axis',
        ];
    }

    // ------ Getters/Setters ----------

    /**
     * @returns { "x" | "y" }
     * */
    get indexAxis() {
        return this.getAttribute('index-axis') === 'y' ? 'y' : 'x';
    }

    get responsive() {
        return !this.hasAttribute('no-responsive');
    }

    get maintainAspectRatio() {
        return !this.hasAttribute('no-maintain-aspect-ratio');
    }

    get aspectRatio() {
        const aspectRatio = this.getAttribute('aspect-ratio');
        return aspectRatio ? Number(aspectRatio) : 2;
    }

    get padding() {
        const padding = this.getAttribute('padding');
        return padding ? Number(padding) : 0;
    }

    get width() {
        return this.getAttribute('width');
    }

    /**
     * @param {string} value
     * */
    set width(value) {
        this.setAttribute('width', value);
        this.style.setProperty('--chart-width', this.width);
    }

    get height() {
        return this.getAttribute('height');
    }

    /**
     * @param {string} value
     * */
    set height(value) {
        this.setAttribute('height', value);
        this.style.setProperty('--chart-height', this.height);
    }

    disconnectedCallback() {
        this.observer.disconnect();
    }
}
