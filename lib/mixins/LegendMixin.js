import { Chart } from 'chart.js';
import { asNumberOrDefault, isLegendElement } from '../util.js';

// TODO: Add htmlLegend support

/**
 * Using mixins to split up the code by role. Allows for more readable and maintainable code
 * */
export const LegendMixin = superclass =>
    /**
     * @mixin
     * */
    class extends superclass {
        _getLegendElement() {
            return Array.from(this.children).filter(isLegendElement)[0];
        }

        _parseLegend() {
            const legendElement = this._getLegendElement();
            if (!legendElement) return;

            // Initialize the legend object
            this.options.plugins.legend = {
                display: true,
                position: legendElement.position ?? 'top',
                align: legendElement.align ?? 'center',
                labels: {
                    font: {
                        size: asNumberOrDefault(legendElement.size, 12),
                    },
                    boxWidth: asNumberOrDefault(legendElement.boxWidth, 40),
                    boxHeight: asNumberOrDefault(legendElement.boxWidth, asNumberOrDefault(legendElement.size, 12)),
                    color: legendElement.color ?? Chart.defaults.color,
                    padding: asNumberOrDefault(legendElement.padding, 10),
                    usePointStyle: legendElement.usePointStyleAsBoolean,
                },
                title: {
                    display: legendElement.titleText && legendElement.titleText.length > 0,
                    text: legendElement.titleText,
                    font: {
                        size: asNumberOrDefault(legendElement.titleSize, 12),
                    },
                    color: legendElement.titleColor ?? Chart.defaults.color,
                    padding: asNumberOrDefault(legendElement.padding, 0),
                },
            }
        };
    };
