const template = document.createElement("template");
template.innerHTML = ``;

export class ChartJsData extends HTMLElement {
    constructor() {
        super();
        const root = this.attachShadow({ mode: "open" });
        root.appendChild(template.content.cloneNode(true));
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    static get observedAttributes() {
        return ["label", "background", "border", "data"];
    }
}
