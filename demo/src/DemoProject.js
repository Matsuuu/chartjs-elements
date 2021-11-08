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
        this.title = 'Hey there';
        this.counter = 5;
        this.chartData = [
            { label: 'Foo', data: 12 },
            { label: 'Bar', data: 15 },
            { label: 'Baz', data: 10 },
        ];
        this.chartData = [
            [
                { label: 'Foo', data: 12 },
                { label: 'Bar', data: 15 },
                { label: 'Baz', data: 10 },
            ],
            [
                { label: 'Foo', data: 8 },
                { label: 'Bar', data: 14 },
                { label: 'Baz', data: 11 },
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

    rand() {
        return { label: 'New', data: Math.floor(Math.random() * 15 + 5) };
    }

    render() {
        return html`
            <h2>${this.title} Nr. ${this.counter}!</h2>
            <button @click=${this.__increment}>increment</button>
            <button @click=${this.addData}>Add data</button>
            <button @click=${this.addDataset}>Add dataset</button>

            <chart-js label="Random data">
                ${this.chartData.map(
            (cd, i) => html`
                        <chart-js-dataset label="Data ${i}">
                            ${cd.map(d => html` <chart-js-data label=${d.label} data=${d.data}></chart-js-data> `)}
                        </chart-js-dataset>
                    `,
        )}
            </chart-js>

            <chart-js type="line">
                ${this.chartData.map(
            (cd, i) => html`
                        <chart-js-dataset label="Data ${i}">
                            ${cd.map(d => html` <chart-js-data label=${d.label} data=${d.data}></chart-js-data> `)}
                        </chart-js-dataset>
                    `,
        )}
            </chart-js>
        `;
    }
}
