//функция закрытия попапа
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscap);
  popupElement.removeEventListener('click', closePopupByOverlayClick);
}

function closeEscap() {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//функция закрытие попапа на overlay
function closePopupByOverlayClick() {
  const popupOpened = document.querySelector('.popup_opened');
  if (event.target !== popupOpened) return;

  closePopup(popupOpened);
}
//функция открытия попапа
export function popupOpen(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscap);
  popupElement.addEventListener('click', closePopupByOverlayClick);
}
