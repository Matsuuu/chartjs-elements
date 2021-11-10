import { ChartDataElement } from "./ChartDataElement";

export class ChartJsData extends ChartDataElement {

    constructor() {
        super();
        this.init(ChartJsData);
    }

    static get observedAttributes() {
        return ['label', 'background-color', 'border-color', 'data'];
    }
}
