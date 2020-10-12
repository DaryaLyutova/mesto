import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupElement, { formSubmit }) {
    super(popupElement);
    this._formSubmit = formSubmit;
    // this._popupSaveButton = document.querySelector('.popup__button');
  }
  _getInputValues(evt) {
    evt.preventDefault();   
    this._formSubmit();
  }
  setEventListeners() {
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

  // renderLoading(isLoading) {
  //   if (isLoading) {
  //     this._popupSaveButton.innerText = 'Сохранение...';
  //     console.log(this._popupSaveButton);
  //   } 
  //   // else {
  //   //   this._popupSaveButton.innerText = 'Сохранение';
  //   //   // console.log(popupSaveButton);
  //   // }
  // }
}
