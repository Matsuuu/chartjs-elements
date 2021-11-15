import { Chart } from 'chart.js';
import { ChartDataElement } from '../ChartDataElement';
import { asNumberOrDefault } from '../util';

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

    asData() {
        const legendData = {
            display: true,
            position: this.position ?? 'top',
            align: this.align ?? 'center',
            labels: {
                font: {
                    size: asNumberOrDefault(this.size, 12),
                },
                boxWidth: asNumberOrDefault(this.boxWidth, 40),
                boxHeight: asNumberOrDefault(this.boxWidth, asNumberOrDefault(this.size, 12)),
                color: this.color ?? Chart.defaults.color,
                padding: asNumberOrDefault(this.padding, 10),
                usePointStyle: this.usePointStyleAsBoolean,
            },
            title: {
                display: this.titleText && this.titleText.length > 0,
                text: this.titleText,
                font: {
                    size: asNumberOrDefault(this.titleSize, 12),
                },
                color: this.titleColor ?? Chart.defaults.color,
                padding: asNumberOrDefault(this.padding, 0),
            },
        };
        return legendData;
    }

    static get observedAttributes() {
        return [
            'align',
            'position',
            'size',
            'hide',
            'box-width',
            'box-height',
            'color',
            'padding',
            'use-point-style',
            'title-text',
            'title-size',
            'title-color',
            'title-padding',
        ];
    }
}
