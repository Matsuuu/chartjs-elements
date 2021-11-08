import { Chart, registerables } from 'chart.js';
import { ChartJsData } from './ChartJsData';
import { chartColor } from './util';

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
    display: block;
}

</style>

<canvas></canvas>
<slot></slot>
`;

export class ChartJsElement extends HTMLElement {
    constructor() {
        super();

        this.width = 700;
        this.height = 350;

        const root = this.attachShadow({ mode: 'open' });
        root.appendChild(template.content.cloneNode(true));

        this.slotElement = root.querySelector('slot');
        this.canvas = this.shadowRoot.querySelector('canvas');
        this.chart = null;
        this.observer = null;

        this.dataElements = [];
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
        console.log({ mutationList, observer });
        this.updateChart();
    }

    _getDataElements() {
        return Array.from(this.children).filter(elem => elem.nodeName === 'CHART-JS-DATA');
    }

    _parseChartData() {
        const dataElements = Array.from(this.children).filter(elem => elem.nodeName === 'CHART-JS-DATA');
        const labels = this.chart?.data?.labels ?? [];
        let dataset = this.chart?.data?.datasets[0];

        if (!dataset) {
            dataset = {
                label: 'Placeholder label',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 3,
            };
            this.chart.data.datasets.push(dataset);
        }
        for (let i = 0; i < dataElements.length; i++) {
            let dataEl = /** @type ChartJsData */ (dataElements[i]);
            const oldDataEl = this.dataElements[i];
            if (dataEl === oldDataEl) {
                dataEl = oldDataEl;
            }

            labels[i] = dataEl.label;
            dataset.data[i] = dataEl.data;
            dataset.backgroundColor[i] = dataEl.backgroundColor ?? chartColor(i);
            dataset.borderColor[i] = dataEl.borderColor ?? chartColor(i, false);
        }
        console.log(dataset);
        console.log(this.chart.data);

        /*this.chartData = {
        labels: labels,
        datasets: [dataset],
        };*/
        this.options = {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        };
        this.dataElements = dataElements;
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
            type: 'bar',
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
        return ['label', 'height', 'width'];
    }

    get width() {
        return Number(this.getAttribute('width'));
    }

    /**
     * @param {number} value
     * */
    set width(value) {
        this.setAttribute('width', value.toString());
        this.style.width = this.width + 'px';
    }

    get height() {
        return Number(this.getAttribute('height'));
    }

    /**
     * @param {number} value
     * */
    set height(value) {
        this.setAttribute('height', value.toString());
        this.style.height = this.height + 'px';
    }

    disconnectedCallback() {
        this.observer.disconnect();
    }
}
