const popup = document.querySelector('.popup');
const popupAddCard = document.querySelector('.popup_add-card');
const popupInfo = document.querySelector('.popup_info');
const popupOpenButton = document.querySelector('.edit-button');
const popupAddCardOpenButton = document.querySelector('.profile__add-button');
const popupAddCardCloseButton = document.querySelector(
  '.popup__close-button_card'
);
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupSaveButton = popup.querySelector('.popup__button');
const namePerson = document.querySelector('.profile-info__name');
const aboutYou = document.querySelector('.profile-info__activity');
const inputName = popup.querySelector('.popup__input_name');
const inputAboutYou = popup.querySelector('.popup__input_activity');
const popupCardSaveButton = document.querySelector('.popup__button_card');
const popupCloseButtonPhoto = popupPhoto.querySelector(
  '.popup__close-button_photo'
);
const inputPlaceName = popupAddCard.querySelector('.popup__input_placename');
const inputLink = popupAddCard.querySelector('.popup__input_link');

//добавление карточки
import { cardsContainer, Card, popupPhoto, initialCards } from './Card.js';

//функция для создания карточки иеста
function makeCard(name, link) {
  // Создадим экземпляр карточки
  const card = new Card(name, link);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  cardsContainer.prepend(cardElement);
}

initialCards.forEach((item) => {
  makeCard(item.name, item.link);
});

//добавление валидации

import { FormValidator, getFormList, selectorObj } from './FormValidator.js';

getFormList.forEach(function (formElement) {
  const formValidator = new FormValidator(selectorObj, formElement);

  formValidator.enableValidation();
});

// функция очищение формы попапов
function resetFormPopup(popupElement) {
  const inputList = Array.from(popupElement.querySelectorAll('.popup__input'));
  const inputSpan = Array.from(popupElement.querySelectorAll('.popup__error'));

  inputList.forEach(function (inputElement) {
    inputElement.classList.remove('popup__input_type_error');
  });

  inputSpan.forEach(function (spanElement) {
    spanElement.classList.remove('popup__error_visible');
    spanElement.textContent = '';
  });

  popupElement.reset();
}

//функция открытия попапа
function popupAdd(popupElement) {
  popupElement.classList.add('popup_opened');
  resetFormPopup(popupElement);
  document.addEventListener('keydown', closeEscap);
}

//функция закрытия попапа
function popupRemove(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscap);
}

//функция закрытие попапа на overlay
function closePopup(popupElement) {
  if (event.target !== popupElement) return;
  popupRemove(popupElement);
}

// добавления новой карточки с фотографией
popupAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const nameElement = inputPlaceName.value;
  const linkElement = inputLink.value;

  makeCard(nameElement, linkElement);

  popupAddCard.reset();
});

//вызов функций открытия/закрытия и обработки данных попапов
popupOpenButton.addEventListener('click', function () {
  popupAdd(popupInfo);
  inputName.value = namePerson.textContent;
  inputAboutYou.value = aboutYou.textContent;
  popupSaveButton.classList.remove('popup__button_disabled');
});
popupCloseButton.addEventListener('click', function () {
  popupRemove(popupInfo);
});
popupAddCardOpenButton.addEventListener('click', function () {
  popupAdd(popupAddCard);
});
popupAddCardCloseButton.addEventListener('click', function () {
  popupRemove(popupAddCard);
});

popupPhoto.addEventListener('click', function () {
  closePopup(popupPhoto);
});

popupCloseButtonPhoto.addEventListener('click', function () {
  popupRemove(popupPhoto);
});

//внесение изменений данных пользователя из попапа
function formSubmitHandler(evt) {
  evt.preventDefault();

  namePerson.textContent = inputName.value;
  aboutYou.textContent = inputAboutYou.value;
}

popup.addEventListener('submit', formSubmitHandler);

//закрытие попапов при сохранении
popupSaveButton.addEventListener('click', function () {
  popupRemove(popupInfo);
});
popupCardSaveButton.addEventListener('click', function () {
  popupRemove(popupAddCard);
});

// закрытие на overlay
popup.addEventListener('click', function () {
  closePopup(popup);
});

popupAddCard.addEventListener('click', function () {
  closePopup(popupAddCard);
});

// //закрытие попапов на Esc
function closeEscap(evt) {
  if (evt.key === 'Escape') {
    popup.classList.remove('popup_opened');
    popupAddCard.classList.remove('popup_opened');
    popupPhoto.classList.remove('popup_opened');
  }
}

(function closeEscapPopupPhoto() {
  document.addEventListener('keydown', closeEscap);
})();
