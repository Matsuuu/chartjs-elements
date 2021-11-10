import { kebabToPascal } from "./util";

/**
 * @typedef ChartDataElementImplementation
 * @property {string[]} observedAttributes
 * @augments ChartDataElement
 * */

/**
 * @class
 * @abstract
 *
 * ChartDataElement is a base class that all of the data focused elements
 * of the Chartjs elements library should extend to reduce the usage of boilerplate
 * */
export class ChartDataElement extends HTMLElement {
    /**
     * @param {ChartDataElementImplementation} staticInstance
     */
    init(staticInstance) {
        this.mapGettersAndSetters(staticInstance);
    }

    /**
     * @param {ChartDataElementImplementation} [staticInstance]
     */
    mapGettersAndSetters(staticInstance) {
        const attributes = staticInstance.observedAttributes;

        attributes.forEach(attr => {
            function getter() {
                return this.getAttribute(attr);
            }
            /**
             * @param {any} value
             */
            function setter(value) {
                this.setAttribute(attr, value);
            }

            Object.defineProperty(this, kebabToPascal(attr), {
                get: getter,
                set: setter,
            });
        });
    }

    static get observedAttributes() {
        return [];
    }
}
