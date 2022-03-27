export default class Section {
    constructor({ items, renderer }, container) {
        this._renderItems = items;
        this._renderer = renderer;
        this._container = container;
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