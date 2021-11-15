import { ChartDataElement } from '../ChartDataElement';

export class ChartJsDataset extends ChartDataElement {
    constructor() {
        super();

        this.label = undefined;
        this.backgroundColor = undefined;
        this.bordercolor = undefined;
        this.data = undefined;
        this.tension = undefined;
        this.index = undefined;
        this.type = undefined;

        this.init(ChartJsDataset);
    }

    static get observedAttributes() {
        return ['label', 'background-color', 'border-width', 'data', 'tension', 'index', 'type'];
    }
}
