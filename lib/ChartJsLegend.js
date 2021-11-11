import { ChartDataElement } from "./ChartDataElement";

export class ChartJsLegend extends ChartDataElement {

    constructor() {
        super();
        this.position = undefined;
        this.align = undefined;
        this.size = undefined;

        this.init(ChartJsLegend);
    }

    static get observedAttributes() {
        return ['align', 'position', 'size'];
    }
}
