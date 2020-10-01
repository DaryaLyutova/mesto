export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
  }

  // закрытие попапа на Esc
  _handleEscClose() {
    if (event.key === 'Escape') {
      this.closePopup();
    }
  }

  // закрытие попапа на overlay
  _closePopupByOverlayClick() {
    if (event.target !== this._popupElement) return;
    this.closePopup();
  }

  popupOpen() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popupElement.addEventListener(
      'click',
      this._closePopupByOverlayClick.bind(this)
    );
  }

  closePopup() {
    this._popupElement.classList.remove('popup_opened');

    document.removeEventListener('keydown', this._handleEscClose);
    this._popupElement.removeEventListener(
      'click',
      this._closePopupByOverlayClick
    );
  }

  // слушатель кликов на иконку закрыть
  setEventListeners() {
    this._popupElement
      .querySelector('.popup__close-button')
      .addEventListener('click', () => {
        this.closePopup();
      });
  }
}
