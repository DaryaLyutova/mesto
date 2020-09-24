export default class Section {
  constructor({ data, renderer }, cardsContainer) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = cardsContainer;
  }

  renderItems() {
    this._initialArray.forEach((item) => {
      this._renderer(item); 
    });
  }

  setItem(element) {
    this._container.prepend(element);
  }
}
