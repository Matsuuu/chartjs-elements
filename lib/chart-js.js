import { ChartJsElement } from "./ChartJs";
import { ChartJsData } from "./data-elements/ChartJsData";
import { ChartJsDataset } from "./data-elements/ChartJsDataset";
import { ChartJsLegend } from "./data-elements/ChartJsLegend";
import { ChartJsTitle } from "./data-elements/ChartJsTitle";

customElements.define("chart-js", ChartJsElement);
customElements.define("chart-js-data", ChartJsData);
customElements.define("chart-js-dataset", ChartJsDataset);
customElements.define("chart-js-legend", ChartJsLegend);
customElements.define("chart-js-title", ChartJsTitle);
