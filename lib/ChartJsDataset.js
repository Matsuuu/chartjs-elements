import { ChartDataElement } from './ChartDataElement';

export class ChartJsDataset extends ChartDataElement {
    constructor() {
        super();
        this.init(ChartJsDataset);
    }

    static get observedAttributes() {
        return ['label', 'background-color', 'border-width', 'data', 'tension'];
    }
}
