import { html, css, LitElement } from 'lit';
import "chartjs-elements";

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
        };
    }

    constructor() {
        super();
        this.title = 'Hey there';
        this.counter = 5;
    }

    __increment() {
        this.counter += 1;
    }

    render() {
        return html`
      <h2>${this.title} Nr. ${this.counter}!</h2>
      <button @click=${this.__increment}>increment</button>

      <chart-js>
          <chart-js-data label="Foo" background-color="#ff6d00" border-color="#FFFFFF" data="12"></chart-js-data>
          <chart-js-data label="Bar" background-color="#5522FF" border-color="#FFFFFF" data="15"></chart-js-data>
          <chart-js-data label="Baz" background-color="#99AA77" border-color="#FFFFFF" data="10"></chart-js-data>
      </chart-js>
    `;
    }
}
