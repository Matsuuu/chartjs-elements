import { Chart, registerables } from 'chart.js';

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

        this._width = 700;
        this._height = 700;
        this.style.width = this._width + 'px';
        this.style.height = this._height + 'px';

        const root = this.attachShadow({ mode: 'open' });
        root.appendChild(template.content.cloneNode(true));

        this.slotElement = root.querySelector('slot');
        this.canvas = this.shadowRoot.querySelector('canvas');
        this.chart = null;

        this.slotElement.addEventListener('slotchange', this.onSlotChange.bind(this));

        this.dataElements = [];
        this.labels = [];
        this.datasets = []
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
    }

    /**
     * @param {Event} event
     */
    onSlotChange(event) {
        this.dataElements = Array.from(this.children).filter(elem => elem.nodeName === 'CHART-JS-DATA');
        console.log(this.dataElements);
        this._parseChartData();
        this.createChart();
    }

    _parseChartData() {
        const labels = [];
        const dataset = {
            label: 'Placeholder label',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
        };

        this.dataElements.forEach(dataEl => {
            labels.push(dataEl.getAttribute('label'));
            dataset.data.push(dataEl.getAttribute('data'));
            dataset.backgroundColor.push(dataEl.getAttribute('background-color'));
            dataset.borderColor.push(dataEl.getAttribute('border-color'));
        });

        this.labels = labels;
        this.datasets = [dataset];
        this.options = {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        };
    }

    createChart() {
        if (this.chart?.attached) {
            this.chart.destroy();
        }

        const ctx = this.canvas.getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.labels,
                datasets: this.datasets,
            },
            options: this.options,
        });
    }

    attributeChangedCallback(name, oldValue, newValue) { }

    static get observedAttributes() {
        return ['label', 'height', 'width'];
    }
}
