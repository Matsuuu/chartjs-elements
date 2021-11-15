import { ChartJsElement } from "./ChartJs.js";
import { ChartJsData } from "./data-elements/ChartJsData.js";
import { ChartJsDataset } from "./data-elements/ChartJsDataset.js";
import { ChartJsLegend } from "./data-elements/ChartJsLegend.js";
import { ChartJsTitle } from "./data-elements/ChartJsTitle.js";
import { ChartJsScale } from "./data-elements/ChartJsScale.js";

customElements.define("chart-js", ChartJsElement);
customElements.define("chart-js-data", ChartJsData);
customElements.define("chart-js-dataset", ChartJsDataset);
customElements.define("chart-js-legend", ChartJsLegend);
customElements.define("chart-js-title", ChartJsTitle);
customElements.define("chart-js-scale", ChartJsScale);
