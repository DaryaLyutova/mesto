import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._image = this._popupElement.querySelector('.popup__image');
    this._name = this._popupElement.querySelector('.popup__title-photo');
  }

  popupOpen(name, link) {
    super.popupOpen();
    this._name.textContent = name;
    this._image.src = link;
  }
}
