import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupElement, { formSubmit }) {
    super(popupElement);
    this._formSubmit = formSubmit;
  }
  _getInputValues(evt) {
    evt.preventDefault();
    this._formSubmit();
  }
  _setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      this._getInputValues(evt);
      this.closePopup();
    });
  }

  closePopup() {
    super.closePopup();
    this._popupElement.reset();
  }
}
