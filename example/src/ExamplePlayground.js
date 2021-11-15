import { LitElement, html, css } from 'lit';
import 'playground-elements';

const CHARTJS_VERSION = "0.0.1-5";

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
                padding-bottom: 5vh;
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
    <chart-js-title text="Regular bar chart" size="24" padding="5"></chart-js-title>

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
    "chartjs-elements": "${CHARTJS_VERSION}",
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
  <chart-js type="pie" aspect-ratio="1.6">
    <chart-js-title text="Pie chart with subtitle" size="24" padding="5"></chart-js-title>
    <chart-js-title text="And an aligned legend" size="18" padding="0" subtitle></chart-js-title>
    <chart-js-legend align="start"></chart-js-legend>

    <chart-js-dataset label="Data">
        <chart-js-data label="Label padding" data="24"></chart-js-data>
        <chart-js-data label="Subtitle padding" data="18"></chart-js-data>
        <chart-js-data label="Legend padding" data="4"></chart-js-data>
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
    "chartjs-elements": "${CHARTJS_VERSION}"
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
  <chart-js type="doughnut">
    <chart-js-data label="Strawberry" data="10"></chart-js-data>
    <chart-js-data label="Chocolate" data="15"></chart-js-data>
    <chart-js-data label="Blueberry" data="8"></chart-js-data>
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
    "chartjs-elements": "${CHARTJS_VERSION}"
  }
}

                    </script>
                </playground-ide>
    `
    }

    getCombinationChartPlayground() {
        return html`
                <playground-ide editable-file-system line-numbers resizable>
                    <script type="sample/html" filename="index.html">
<!-- playground-hide -->
<!doctype html>
<body>
<!-- playground-hide-end -->
  <chart-js type="bar">
    <chart-js-scale name="y" suggested-max="25"></chart-js-scale>
    <chart-js-title text="You can also combine data types" size="18" padding="0" subtitle></chart-js-title>

    <chart-js-dataset label="Bar data">
        <chart-js-data label="Foo" data="10"></chart-js-data>
        <chart-js-data label="Bar" data="15"></chart-js-data>
        <chart-js-data label="Baz" data="8"></chart-js-data>
        <chart-js-data label="Biz" data="15"></chart-js-data>
    </chart-js-dataset>

    <chart-js-dataset label="Line data" type="line">
        <chart-js-data label="Foo" data="10"></chart-js-data>
        <chart-js-data label="Bar" data="12"></chart-js-data>
        <chart-js-data label="Baz" data="18"></chart-js-data>
        <chart-js-data label="Baz" data="15"></chart-js-data>
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
    "chartjs-elements": "${CHARTJS_VERSION}"
  }
}

                    </script>
                </playground-ide>
    `
    }

    getStackedPlayground() {
        return html`
                <playground-ide editable-file-system line-numbers resizable>
                    <script type="sample/html" filename="index.html">
<!-- playground-hide -->
<!doctype html>
<body>
<!-- playground-hide-end -->
  <chart-js type="bar">
    <chart-js-scale name="y" stacked></chart-js-scale>
    <chart-js-scale name="x" stacked></chart-js-scale>
    <chart-js-title text="Stacked charts are just a few scales away " size="15" padding="0" subtitle></chart-js-title>

    <chart-js-dataset label="Bar data">
        <chart-js-data label="Foo" data="10"></chart-js-data>
        <chart-js-data label="Bar" data="15"></chart-js-data>
        <chart-js-data label="Baz" data="8"></chart-js-data>
        <chart-js-data label="Biz" data="15"></chart-js-data>
    </chart-js-dataset>

    <chart-js-dataset label="Other bars">
        <chart-js-data label="Foo" data="5"></chart-js-data>
        <chart-js-data label="Bar" data="10"></chart-js-data>
        <chart-js-data label="Baz" data="15"></chart-js-data>
        <chart-js-data label="Baz" data="12"></chart-js-data>
    </chart-js-dataset>

    <chart-js-dataset label="Even more bars">
        <chart-js-data label="Foo" data="4"></chart-js-data>
        <chart-js-data label="Bar" data="4"></chart-js-data>
        <chart-js-data label="Baz" data="4"></chart-js-data>
        <chart-js-data label="Baz" data="4"></chart-js-data>
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
    "chartjs-elements": "${CHARTJS_VERSION}"
  }
}

                    </script>
                </playground-ide>
    `
    }

    getLinePlaygrounds() {
        return html`
                <playground-ide editable-file-system line-numbers resizable>
                    <script type="sample/html" filename="index.html">
<!-- playground-hide -->
<!doctype html>
<body>
<!-- playground-hide-end -->
  <chart-js type="line">
    <chart-js-title text="You can add tension to line data" size="18" padding="0" subtitle></chart-js-title>

    <chart-js-dataset label="Line data" tension="0.3">
        <chart-js-data label="Foo" data="10"></chart-js-data>
        <chart-js-data label="Bar" data="15"></chart-js-data>
        <chart-js-data label="Baz" data="8"></chart-js-data>
        <chart-js-data label="Biz" data="15"></chart-js-data>
    </chart-js-dataset>

    <chart-js-dataset label="Weighed line data">
        <chart-js-data label="Foo" data="10"></chart-js-data>
        <chart-js-data label="Bar" data="12"></chart-js-data>
        <chart-js-data label="Baz" data="18"></chart-js-data>
        <chart-js-data label="Baz" data="15"></chart-js-data>
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
    "chartjs-elements": "${CHARTJS_VERSION}"
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
                ${this.getCombinationChartPlayground()}
                ${this.getStackedPlayground()}
                ${this.getLinePlaygrounds()}
            </main>
        `;
    }
}
