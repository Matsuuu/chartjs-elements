import { isLegendElement } from '../util.js';

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
            this.options.plugins = {
                legend: {
                    labels: {
                        font: {},
                    },
                },
            };
            const legendOptions = this.options.plugins.legend;

            if (legendElement.position) {
                legendOptions.position = legendElement.position;
            }
            if (legendElement.align) {
                legendOptions.align = legendElement.align;
                legendOptions.title = {
                    position: legendElement.align,
                };
            }

            if (legendElement.size) {
                legendOptions.labels.font.size = legendElement.size;
            }

            if (legendElement.hideAsBoolean) {
                legendOptions.display = false;
            }

            if (legendElement.boxWidth) {
                legendOptions.labels.boxWidth = Number(legendElement.boxWidth);
            }
            if (legendElement.boxHeight) {
                legendOptions.labels.boxHeight = Number(legendElement.boxHeight);
            }

            if (legendElement.color) {
                legendOptions.labels.color = legendElement.color;
            }
            if (legendElement.padding) {
                legendOptions.labels.padding = Number(legendElement.padding);
            }
            if (legendElement.usePointStyleAsBoolean) {
                legendOptions.labels.usePointStyle = legendElement.usePointStyleAsBoolean;
            }

            if (legendElement.titleText) {
                legendOptions.title.display = true;
                legendOptions.title.text = legendElement.titleText;
            }
            if (legendElement.titleSize) {
                legendOptions.title.font.size = legendElement.titleSize;
            }
            if (legendElement.titleColor) {
                legendOptions.title.color = legendElement.titleColor;
            }
            if (legendElement.titlePadding) {
                legendOptions.title.padding = legendElement.titlePadding;
            }
        }
    };
