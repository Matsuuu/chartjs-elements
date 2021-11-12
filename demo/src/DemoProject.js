import { html, css, LitElement } from 'lit';
import 'chartjs-elements';

export class DemoProject extends LitElement {
    static get styles() {
        return css`
            :host {
                display: block;
                padding: 25px;
                color: var(--demo-project-text-color, #000);
            }
            .charts {
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
            }

            .charts > * {
                flex-basis: 30%;
                margin-right: 2%;
            }
        `;
    }

    static get properties() {
        return {
            title: { type: String },
            counter: { type: Number },
            chartData: { type: Array },
            chartDataTwo: { type: Array },
        };
    }

    constructor() {
        super();
        this.title = 'ChartJS Elements demos';
        this.counter = 5;
        this.chartData = [
            [
                { label: 'Foo', data: 12 },
                { label: 'Bar', data: 15 },
                { label: 'Baz', data: 10 },
            ],
        ];
    }

    __increment() {
        this.counter += 1;
    }

    addData() {
        this.chartData = this.chartData.map(cd => {
            return [...cd, this.rand()];
        });
    }

    addDataset() {
        const data = [];
        for (let i = 0; i < this.chartData[0].length; i++) {
            data.push(this.rand());
        }
        this.chartData = [...this.chartData, data];
    }

    removeData() {
        this.chartData = this.chartData.map(cd => {
            cd.pop();
            return cd;
        });
    }

    removeDataset() {
        this.chartData.pop();
        this.requestUpdate();
    }

    rand() {
        return { label: 'New', data: Math.floor(Math.random() * 15 + 5) };
    }

    render() {
        return html`
            <h2>${this.title} Nr. ${this.counter}!</h2>
            <button @click=${this.__increment}>increment</button>
            <button @click=${this.addData}>Add data</button>
            <button @click=${this.addDataset}>Add dataset</button>
            <button @click=${this.removeData}>Remove data</button>
            <button @click=${this.removeDataset}>Remove dataset</button>

            <div class="charts">
                <chart-js type="bar">${this.renderChartChildren()}</chart-js>
                <chart-js type="line">${this.renderChartChildren()}</chart-js>
                <chart-js type="pie">${this.renderChartChildren()}</chart-js>
                <chart-js type="doughnut">${this.renderChartChildren()}</chart-js>
                <chart-js type="polarArea">${this.renderChartChildren()}</chart-js>
                <chart-js type="radar">${this.renderChartChildren()}</chart-js>
            </div>
        `;
    }

    renderChartChildren() {
        return html` 
            <chart-js-title text="Data chart #1" size="24" padding="5"></chart-js-title>
            <chart-js-title text="This is a data chart" size="18" padding="0" subtitle></chart-js-title>
            <chart-js-legend align="start"></chart-js-legend>
            ${this.chartData.map((cd, i) => this.renderDataset(cd, i))} 
        `;
    }

    renderDataset(cd, i) {
        return html`
            <chart-js-dataset label="Data ${i}">
                ${cd.map(d => html` <chart-js-data label=${d.label} data=${d.data}></chart-js-data> `)}
            </chart-js-dataset>
        `;
    }
}
