export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._sectionContainer = document.querySelector(containerSelector);
  }

  renderItems() {
    this.clear();
    this._items.forEach((item) => this._renderer(item));
  }

  clear() {
    this._sectionContainer.innerHTML = "";
  }

  addItem(item) {
    this._sectionContainer.prepend(item);
  }
}
