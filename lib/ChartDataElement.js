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

    constructor() {
        super();
        this.initialized = false;
    }

    /**
     * @param {ChartDataElementImplementation} staticInstance
     */
    init(staticInstance) {
        this.mapGettersAndSetters(staticInstance);
        this.initialized = true;
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

            function booleanGetter() {
                return this.hasAttribute(attr);
            }

            /**
             * @param {any} value
             */
            function setter(value) {
                if (typeof value === "undefined") {
                    this.removeAttribute(attr);
                } else {
                    this.setAttribute(attr, value);
                }
            }

            Object.defineProperty(this, kebabToPascal(attr), {
                get: getter,
                set: setter,
            });
            Object.defineProperty(this, kebabToPascal(attr) + "AsBoolean", {
                get: booleanGetter
            })
        });
    }

    static get observedAttributes() {
        return [];
    }
}
