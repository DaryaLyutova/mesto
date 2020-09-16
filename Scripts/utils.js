//функция закрытия попапа
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

function closeEscap(popupElement) {
  if (event.key !== 'Escape') return;
  closePopup(popupElement);
}

//функция закрытие попапа на overlay
function closePopupByOverlayClick(popupElement) {
  if (event.target !== popupElement) return;
  closePopup(popupElement);
}
//функция открытия попапа
export function popupOpen(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', function () {
    closeEscap(popupElement);
  });
  popupElement.addEventListener('click', function () {
    closePopupByOverlayClick(popupElement);
  });
}
