import { ChartDataElement } from './ChartDataElement';

export class ChartJsData extends ChartDataElement {
    constructor() {
        super();
        this.init(ChartJsData);

        this.label = undefined;
        this.data = undefined;
        this.backgroundColor = undefined;
        this.borderColor = undefined;
    }

    static get observedAttributes() {
        return ['label', 'background-color', 'border-color', 'data'];
    }
}
