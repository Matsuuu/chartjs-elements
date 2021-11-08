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
    }

    __increment() {
        this.counter += 1;
    }

    addData() {
        this.chartData = [...this.chartData, { label: "New", data: Math.floor(Math.random() * 15 + 5) }]
    }

    render() {
        return html`
            <h2>${this.title} Nr. ${this.counter}!</h2>
            <button @click=${this.__increment}>increment</button>
            <button @click=${this.addData}>Add data</button>

            <chart-js>
                ${this.chartData.map(
            d => html`
                        <chart-js-data
                            label=${d.label}
                            data=${d.data}
                        ></chart-js-data>
                    `,
        )}
            </chart-js>
        `;
    }
}
