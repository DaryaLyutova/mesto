import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupElement, { formSubmit }) {
    super(popupElement);
    this._formSubmit = formSubmit
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', () => {
      this._formSubmit();
      this.closePopup();
    });
  }
}