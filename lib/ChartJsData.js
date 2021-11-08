const template = document.createElement('template');
template.innerHTML = ``;

export class ChartJsData extends HTMLElement {
    get label() {
        return this.getAttribute('label');
    }

    set label(value) {
        this.setAttribute('label', value);
    }

    get backgroundColor() {
        return this.getAttribute('background-color');
    }

    set backgroundColor(value) {
        this.setAttribute('background-color', value);
    }

    get borderColor() {
        return this.getAttribute('border-color');
    }

    set borderColor(value) {
        this.setAttribute('border-color', value);
    }

    /**
     * @type number
     * */
    get data() {
        return Number(this.getAttribute('data'));
    }

    set data(value) {
        this.setAttribute('data', value.toString());
    }

    static get observedAttributes() {
        return ['label', 'background-color', 'border-color', 'data'];
    }
}
