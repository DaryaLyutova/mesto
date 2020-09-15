import { popupPhoto, popupAddCard, popupInfo } from './constants.js';

export function closeEscap() {
  if (event.key === 'Escape') {
    popupInfo.classList.remove('popup_opened');
    popupAddCard.classList.remove('popup_opened');
    popupPhoto.classList.remove('popup_opened');
  }
}
//функция открытия попапа
export function popupOpen(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscap);
}
