import { Chart, registerables } from 'chart.js';
import { ChartJsData } from './ChartJsData';
import { ChartJsDataset } from './ChartJsDataset';
import { chartColor, getActiveIndex, isDatasetElement } from './util';

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

export class ChartJsElement extends HTMLElement {
    constructor() {
        super();

        this.width = "auto";
        this.height = "auto";

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
        this.options = {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
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
     * @param {any} mutationList
     * @param {any} observer
     */
    _onChange(mutationList, observer) {
        this.updateChart();
    }

    _getDataElements() {
        // TODO: Get name from class itself
        return Array.from(this.children).filter(elem => elem.nodeName === 'CHART-JS-DATA');
    }

    _getDatasetElements() {
        // TODO: Get name from class itself
        return Array.from(this.children).filter(elem => elem.nodeName === 'CHART-JS-DATASET');
    }

    _parseChartData() {
        // TODO: Clean up
        // TODO: Handle removal cases. Could be done through mutationlist?
        const datasets = this._getDatasetElements();
        datasets.forEach((dataset, i) => {
            this._parseDataset(dataset, i, true);
        });
        // For single dataset instances, where you don't need to have a dataset
        if (datasets.length <= 0) {
            this._parseDataset(this, 0, false);
        }
    }

    /**
     * @param {Element} datasetElement
     * @param {number} datasetIndex
     * @param {boolean} multiDataset
     */
    _parseDataset(datasetElement, datasetIndex, multiDataset) {
        const dataElements = Array.from(datasetElement.children).filter(elem => elem.nodeName === 'CHART-JS-DATA');
        const labels = this.chart?.data?.labels ?? [];
        let dataset = this._getOrAddDataset(datasetElement, datasetIndex);

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
    _getOrAddDataset(datasetElement, index) {
        let dataset = this.chart?.data?.datasets[index];

        if (!dataset) {
            dataset = {
                label: isDatasetElement(datasetElement) ? datasetElement.label : this.label,
                data: [],
                backgroundColor: [],
                borderColor: [],
                tension: isDatasetElement(datasetElement) ? datasetElement.tension : 0
            };
            this.datasetElements[index] = {
                element: datasetElement,
                dataElements: [],
            };
            this.chart.data.datasets.push(dataset);
        }
        return dataset;
    }

    updateChart() {
        this._parseChartData();
        if (!this.chart || !this.chart.attached) {
            this.createChart();
        }
        //this.chart.data = this.chartData;
        this.chart.update();
    }

    createChart() {
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
        return ['type', 'label', 'height', 'width'];
    }

    // ------ Getters/Setters ----------

    get width() {
        return this.getAttribute('width');
    }

    /**
     * @param {string} value
     * */
    set width(value) {
        this.setAttribute('width', value);
        this.style.setProperty("--chart-width", this.width);
    }

    get height() {
        return this.getAttribute('height');
    }

    /**
     * @param {string} value
     * */
    set height(value) {
        this.setAttribute('height', value);
        this.style.setProperty("--chart-height", this.height);
    }

    disconnectedCallback() {
        this.observer.disconnect();
    }
}
