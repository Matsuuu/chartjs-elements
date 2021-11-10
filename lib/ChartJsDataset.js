import { ChartDataElement } from './ChartDataElement';

export class ChartJsDataset extends ChartDataElement {
    constructor() {
        super();
        this.init(ChartJsDataset);

        this.label = undefined;
        this.backgroundColor = undefined;
        this.bordercolor = undefined;
        this.data = undefined;
        this.tension = undefined;
    }

    static get observedAttributes() {
        return ['label', 'background-color', 'border-width', 'data', 'tension'];
    }
}
