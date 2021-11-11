import { ChartDataElement } from './ChartDataElement';

export class ChartJsLegend extends ChartDataElement {
    constructor() {
        super();
        this.position = undefined;
        this.align = undefined;
        this.size = undefined;
        this.hideAsBoolean = undefined;
        this.boxWidth = undefined;
        this.boxHeight = undefined;
        this.color = undefined;
        this.padding = undefined;
        this.usePointStyleAsBoolean = undefined;
        this.titleText = undefined;
        this.titleSize = undefined;
        this.titleColor = undefined;
        this.titlePadding = undefined;

        this.init(ChartJsLegend);
    }

    static get observedAttributes() {
        return ['align', 'position', 'size', 'hide', 'box-width', 'box-height', 'color', 'padding', 'use-point-style', 'title-text', 'title-size', 'title-color', 'title-padding'];
    }
}
