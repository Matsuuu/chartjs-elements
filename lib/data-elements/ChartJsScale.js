import { ChartDataElement } from '../ChartDataElement';
import { asNumberOrDefault } from '../util';

export class ChartJsScale extends ChartDataElement {
    constructor() {
        super();

        this.type = undefined;
        this.backgroundColor = undefined;
        this.min = undefined;
        this.max = undefined;
        this.reverseAsBoolean = undefined;
        this.stackedAsBoolean = undefined;
        this.suggestedMax = undefined;
        this.suggestedMin = undefined;
        this.weight = undefined;

        this.init(ChartJsScale);
    }

    asData() {
        const scaleData = {
            backgroundColor: this.backgroundColor,
            display: true,
            min: asNumberOrDefault(this.min, undefined),
            max: asNumberOrDefault(this.max, undefined),
            reverse: this.reverseAsBoolean,
            stacked: this.stackedAsBoolean,
            suggestedMax: asNumberOrDefault(this.suggestedMax, undefined),
            suggestedMin: asNumberOrDefault(this.suggestedMin, undefined),
            weight: asNumberOrDefault(this.weight, 0)
        };
        return scaleData;
    }

    static get observedAttributes() {
        return [
            'type',
            'background-color',
            'min',
            'max',
            'reverse',
            'stacked',
            'suggested-max',
            'suggested-min',
            'weight',
        ];
    }
}
