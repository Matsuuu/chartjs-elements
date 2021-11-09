export class ChartJsLegend extends HTMLElement {
    get align() {
        return this.getAttribute('align');
    }

    set align(value) {
        this.setAttribute('align', value);
    }

    get position() {
        return this.getAttribute('position');
    }

    set position(value) {
        this.setAttribute('position', value);
    }

    static get observedAttributes() {
        return ['position', 'align', 'position'];
    }
}
