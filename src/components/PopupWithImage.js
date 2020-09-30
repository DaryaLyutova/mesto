import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(name, link, popupElement) {
    super(popupElement);
    this._image = this._popupElement.querySelector('.popup__image');
    this._name = name;
    this._link = link;
  }

  popupOpen() {
    super.popupOpen();
    this._popupElement.querySelector(
      '.popup__title-photo'
    ).textContent = this._name;
    this._image.src = this._link;
  }
}
