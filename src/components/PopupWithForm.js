import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupElement, { formSubmit }) {
    super(popupElement);
    this._formSubmit = formSubmit;
    this._popupSaveButton = document.querySelector('.popup__button');
    this._formValues = {};
  }

  _getInputValues() {
    this._inputs = Array.from(
      this._popupElement.querySelectorAll('.popup__input')
    );
    this._inputs.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
    });
  }

  closePopup() {
    super.closePopup();
    this._popupElement.reset();
  }
}
