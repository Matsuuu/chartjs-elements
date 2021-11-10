import { ChartDataElement } from "./ChartDataElement";

export class ChartJsLegend extends ChartDataElement {

    constructor() {
        super();
        this.init(ChartJsLegend);
        this.position = undefined;
        this.align = undefined;
    }

    static get observedAttributes() {
        return ['align', 'position'];
    }
}
