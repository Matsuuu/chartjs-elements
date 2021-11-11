import { ChartDataElement } from '../ChartDataElement';

export class ChartJsTitle extends ChartDataElement {
    constructor() {
        super();

        this.subtitleAsBoolean = undefined;
        this.align = undefined;
        this.color = undefined;
        this.fullSizeAsBoolean = undefined;
        this.position = undefined;
        this.text = undefined;
        this.padding = undefined;
        this.size = undefined;

        this.init(ChartJsTitle);
    }

    static get observedAttributes() {
        return ["align", "color", "full-size", "position", "text", "padding", "size", "subtitle"];
    }
}
