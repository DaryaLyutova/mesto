export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
  }

  // закрытие пщпапа на Esc
  _handleEscClose() {
    if (event.key === 'Escape') {
      // const popupOpened = document.querySelector('.popup_opened');
      this.closePopup();
    }
  }

  // закрытие попапа на overlay
  _closePopupByOverlayClick() {
    // const _popupOpened = document.querySelector('.popup_opened');
    if (event.target !== this._popupElement) return;

    this.closePopup();
  }

  popupOpen() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this._popupElement.addEventListener(
      'click',
      this._closePopupByOverlayClick
    );
  }

  closePopup() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupElement.removeEventListener(
      'click',
      this._closePopupByOverlayClick
    );
    this._setEventListeners();
  }

  // слушатель кликов на иконку закрыть
  _setEventListeners() {
    this._popupElement
      .querySelector('.popup__close-button')
      .addEventListener('click', () => {
        this.closePopup();
      });
  }
}
