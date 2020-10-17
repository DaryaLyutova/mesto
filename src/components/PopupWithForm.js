import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupElement, { formSubmit }) {
    super(popupElement);
    this._formSubmit = formSubmit;
    this._popupSaveButton = document.querySelector('.popup__button');
    this._formValues = [];
  }
  _getInputValues() {
    this._inputList = Array.from(
      this._popupElement.querySelectorAll('.popup__input')
    );
    return this._formValues = this._inputList.map(input => input.value);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getInputValues();
      this._formSubmit();
    });
  }

  closePopup() {
    super.closePopup();
    this._popupElement.reset();
  }
}
