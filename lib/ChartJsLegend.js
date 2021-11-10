import { ChartDataElement } from "./ChartDataElement";

export class ChartJsLegend extends ChartDataElement {

    constructor() {
        super();
        this.init(ChartJsLegend);
    }

    static get observedAttributes() {
        return ['align', 'position'];
    }
}
