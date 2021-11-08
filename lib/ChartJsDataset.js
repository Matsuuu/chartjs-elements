// TODO: Create a tool that combines all datasetoptions, and creates a array of the keys,
// so that they can be used as the observedAttributes
export class ChartJsDataset extends HTMLElement {

    get label() {
        return this.getAttribute("label");
    }

    set label(value) {
        this.setAttribute("label", value);
    }

    get borderWidth() {
        return Number(this.getAttribute("border-width"));
    }

    set borderWidth(value) {
        this.setAttribute("border-width", value.toString());
    }

    get tension() {
        return Number(this.getAttribute("tension"));
    }

    set tension(value) {
        this.setAttribute("tension", value.toString());
    }

    static get observedAttributes() {
        return ['label', 'background-color', 'border-width', 'data', "tension"];
    }
}
