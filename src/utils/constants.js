//каточки на станице
export const initialCards = [
  {
    name: 'Архыз',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

export const popupPhoto = document.querySelector('.popup_photo');
export const popupAddCard = document.querySelector('.popup_add-card');
export const popupInfo = document.querySelector('.popup_info');
export const popupOpenButton = document.querySelector('.edit-button');
export const popupAddCardOpenButton = document.querySelector(
  '.profile__add-button'
);
export const popupAddCardCloseButton = document.querySelector(
  '.popup__close-button_card'
);
export const popupCloseButton = popupInfo.querySelector('.popup__close-button');
export const popupSaveButton = popupInfo.querySelector('.popup__button');
export const namePerson = document.querySelector('.profile-info__name');
export const infoAboutPerson = document.querySelector(
  '.profile-info__activity'
);
export const inputNamePerson = popupInfo.querySelector('.popup__input_name');
export const inputInfoAboutPerson = popupInfo.querySelector(
  '.popup__input_activity'
);
export const popupCardSaveButton = popupAddCard.querySelector(
  '.popup__button_card'
);
export const popupCloseButtonPhoto = popupPhoto.querySelector(
  '.popup__close-button_photo'
);
export const inputPlaceName = popupAddCard.querySelector(
  '.popup__input_placename'
);
export const inputLink = popupAddCard.querySelector('.popup__input_link');
export const cardsContainer = document.querySelector('.places');
export const popupList = Array.from(document.querySelectorAll('.popup'));
