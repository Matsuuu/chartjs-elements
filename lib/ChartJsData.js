const template = document.createElement("template");
template.innerHTML = ``;

export class ChartJsData extends HTMLElement {
    get label() {
        return this.getAttribute("label");
    }

    get backgroundColor() {
        return this.getAttribute("background-color");
    }

    get border() {
        return this.getAttribute("border-color");
    }

    get data() {
        return this.getAttribute("data");
    }

    static get observedAttributes() {
        return ["label", "background-color", "border-color", "data"];
    }
}
