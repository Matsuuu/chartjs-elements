import { Chart } from 'chart.js';
import { ChartDataElement } from '../ChartDataElement';
import { asNumberOrDefault } from '../util';

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

    asData() {
        const titleOptions = {
            text: this.text,
            display: true,
            position: this.position ?? 'top',
            padding: asNumberOrDefault(this.padding, 10),
            color: this.color ?? Chart.defaults.color,
            fullSize: this.fullSizeAsBoolean,
            font: {
                size: asNumberOrDefault(this.size, 12),
            },
        };
        return titleOptions;
    }

    static get observedAttributes() {
        return ['align', 'color', 'full-size', 'position', 'text', 'padding', 'size', 'subtitle'];
    }
}
