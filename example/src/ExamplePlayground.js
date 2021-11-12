import { LitElement, html, css } from 'lit';
import 'playground-elements';

export class ExamplePlayground extends LitElement {
    static get properties() {
        return {};
    }

    static get styles() {
        return css`
            :host {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                font-size: calc(10px + 2vmin);
                color: #1a2b42;
                max-width: 100%;
                margin: 0 auto;
                background-color: var(--example-playground-background-color);
            }
            main {
                width: 90%;
            }
        `;
    }

    constructor() {
        super();
    }

    getBarChartPlayground() {
        return html`
                <playground-ide editable-file-system line-numbers resizable>
                    <script type="sample/html" filename="index.html">
<!-- playground-hide -->
<!doctype html>
<body>
<!-- playground-hide-end -->
  <chart-js type="bar" >
    <chart-js-title text="Data chart #1" size="24" padding="5"></chart-js-title>
    <chart-js-title text="This is a data chart" size="18" padding="0" subtitle></chart-js-title>
    <chart-js-legend align="start"></chart-js-legend>

    <chart-js-dataset label="Data">
        <chart-js-data label="HTML" data="15"></chart-js-data>
        <chart-js-data label="Javascript" data="10"></chart-js-data>
        <chart-js-data label="CSS" data="8"></chart-js-data>
    </chart-js-dataset>

  </chart-js>

<!-- playground-hide -->
  <script type="module" src="./imports.js">&lt;/script>
</body>
<!-- playground-hide-end -->
                    </script>

                    <script type="sample/js" filename="imports.js">
                        import "chartjs-elements";
                    </script>
                    <script type="sample/json" filename="package.json">
{
  "dependencies": {
    "chartjs-elements": "0.0.1-4",
    "chart.js": "3.6.0"
  }
}

                    </script>
                </playground-ide>
        `
    }

    getPieChartPlayground() {
        return html`
                <playground-ide editable-file-system line-numbers resizable>
                    <script type="sample/html" filename="index.html">
<!-- playground-hide -->
<!doctype html>
<body>
<!-- playground-hide-end -->
  <chart-js type="pie" >
    <chart-js-title text="Data chart #1" size="24" padding="5"></chart-js-title>
    <chart-js-title text="This is a data chart" size="18" padding="0" subtitle></chart-js-title>
    <chart-js-legend align="start"></chart-js-legend>

    <chart-js-dataset label="Data">
        <chart-js-data label="Foo" data="10"></chart-js-data>
        <chart-js-data label="Bar" data="15"></chart-js-data>
        <chart-js-data label="Baz" data="8"></chart-js-data>
    </chart-js-dataset>

  </chart-js>

<!-- playground-hide -->
  <script type="module" src="./imports.js">&lt;/script>
</body>
<!-- playground-hide-end -->
                    </script>

                    <script type="sample/js" filename="imports.js">
                        import "chartjs-elements";
                    </script>
                    <script type="sample/json" filename="package.json">
{
  "dependencies": {
    "chartjs-elements": "0.0.1-4",
    "chart.js": "3.6.0"
  }
}

                    </script>
                </playground-ide>
        `
    }

    getMinimalChartPlayground() {
        return html`
                <playground-ide editable-file-system line-numbers resizable>
                    <script type="sample/html" filename="index.html">
<!-- playground-hide -->
<!doctype html>
<body>
<!-- playground-hide-end -->
  <chart-js type="pie">
    <chart-js-data label="Foo" data="10"></chart-js-data>
    <chart-js-data label="Bar" data="15"></chart-js-data>
    <chart-js-data label="Baz" data="8"></chart-js-data>
  </chart-js>

<!-- playground-hide -->
  <script type="module" src="./imports.js">&lt;/script>
</body>
<!-- playground-hide-end -->
                    </script>

                    <script type="sample/js" filename="imports.js">
                        import "chartjs-elements";
                    </script>
                    <script type="sample/json" filename="package.json">
{
  "dependencies": {
    "chartjs-elements": "0.0.1-4",
    "chart.js": "3.6.0"
  }
}

                    </script>
                </playground-ide>
    `
    }

    render() {
        return html`
            <main>
                ${this.getBarChartPlayground()}
                ${this.getPieChartPlayground()}
                ${this.getMinimalChartPlayground()}
            </main>
        `;
    }
}
