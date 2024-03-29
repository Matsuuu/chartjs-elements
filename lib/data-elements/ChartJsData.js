import { ChartDataElement } from '../ChartDataElement';

export class ChartJsData extends ChartDataElement {
    constructor() {
        super();

        this.label = undefined;
        this.data = undefined;
        this.backgroundColor = undefined;
        this.borderColor = undefined;
        this.borderWidth = undefined;
        this.init(ChartJsData);
    }

    static get observedAttributes() {
        return ['label', 'background-color', 'border-color', 'border-width', 'data'];
    }
}
