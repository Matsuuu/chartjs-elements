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
                flex-basis: 48%;
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
            const randData = this.rand();
            randData.label = this.chartData[0][i].label;
            data.push(randData);
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
                <chart-js type="bar"> ${this.renderChartChildren()} </chart-js>
                <chart-js type="bar">
                    ${this.renderChartChildren()}
                    <chart-js-scale name="x" stacked></chart-js-scale>
                    <chart-js-scale name="y" stacked></chart-js-scale>
                </chart-js>
                <chart-js type="bar">
                    ${this.renderChartChildren()}
                    <chart-js-scale name="y" max="50"></chart-js-scale>
                </chart-js>
                <chart-js type="bar" index-axis="y">${this.renderChartChildren()}</chart-js>
                <chart-js type="line">${this.renderChartChildren()}</chart-js>
                <chart-js type="pie">${this.renderChartChildren()}</chart-js>
                <chart-js type="doughnut">${this.renderChartChildren()}</chart-js>
                <chart-js type="polarArea">${this.renderChartChildren()}</chart-js>
                <chart-js type="radar">${this.renderChartChildren()}</chart-js>
                ${this.renderCombinationChart()}
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

    renderCombinationChart() {
        return html`
            <chart-js type="bar">
                <chart-js-title text="This is a combination chart" size="24" padding="5"></chart-js-title>
                <chart-js-dataset label="Data bar" type="bar">
                    <chart-js-data label="January" data="10"></chart-js-data>
                    <chart-js-data label="February" data="20"></chart-js-data>
                    <chart-js-data label="March" data="30"></chart-js-data>
                    <chart-js-data label="April" data="40"></chart-js-data>
                </chart-js-dataset>
                <chart-js-dataset label="Data line" type="line">
                    <chart-js-data label="January" data="12"></chart-js-data>
                    <chart-js-data label="February" data="18"></chart-js-data>
                    <chart-js-data label="March" data="28"></chart-js-data>
                    <chart-js-data label="April" data="41"></chart-js-data>
                </chart-js-dataset>
            </chart-js>
        `;
    }

    renderDataset(cd, i) {
        return html`
            <chart-js-dataset label="Dataset ${i}">
                ${cd.map(d => html` <chart-js-data label=${d.label} data=${d.data}></chart-js-data> `)}
            </chart-js-dataset>
        `;
    }
}
