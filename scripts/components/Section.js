export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderItems = items;
        this._renderer = renderer;
        this._container = containerSelector;

    }

    addItem(element, toBeggining = false) {
        toBeggining ? this._container.prepend(element) : this._container.append(element);
    }

    renderElements() {
        this._renderItems.forEach(element => {
            this._renderer(element)
        });
    }
}