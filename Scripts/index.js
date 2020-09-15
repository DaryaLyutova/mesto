import { Card } from './Card.js';
import {
  initialCards,
  popupPhoto,
  popupAddCard,
  popupInfo,
  popupOpenButton,
  popupAddCardOpenButton,
  popupAddCardCloseButton,
  popupCloseButton,
  popupSaveButton,
  namePerson,
  aboutYou,
  inputName,
  inputAboutYou,
  popupCardSaveButton,
  popupCloseButtonPhoto,
  inputPlaceName,
  inputLink,
  cardsContainer,
} from './constants.js';
import { FormValidator, getFormList, selectorObj } from './FormValidator.js';

//добавление карточки
//функция для создания карточки иеста
function makeCard(name, link, cardSelector) {
  // Создадим экземпляр карточки
  const card = new Card(name, link, cardSelector);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  cardsContainer.prepend(cardElement);
}

initialCards.forEach((item) => {
  makeCard(item.name, item.link, '.place');
});

//добавление валидации
//функция создания валидации
function makeValidation(selectorObj, formElement) {
  const formValidator = new FormValidator(selectorObj, formElement);

  formValidator.enableValidation();
}

//добавляем к каждой форме
getFormList.forEach(function (formElement) {
  makeValidation(selectorObj, formElement);
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
function popupOpen(popupElement) {
  popupElement.classList.add('popup_opened');
  resetFormPopup(popupElement);
  document.addEventListener('keydown', closeEscap);
}

function closeEscap() {
  if (event.key === 'Escape') {
    popupInfo.classList.remove('popup_opened');
    popupAddCard.classList.remove('popup_opened');
    popupPhoto.classList.remove('popup_opened');
  }
}

//функция закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscap);
}

//функция закрытие попапа на overlay
function closePopupByOverlayClick(popupElement) {
  if (event.target !== popupElement) return;
  closePopup(popupElement);
}

// добавления новой карточки с фотографией
popupAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const nameElement = inputPlaceName.value;
  const linkElement = inputLink.value;

  makeCard(nameElement, linkElement);

  closePopup(popupAddCard);

  popupAddCard.reset();
});

//вызов функций открытия/закрытия и обработки данных попапов
popupOpenButton.addEventListener('click', function () {
  popupOpen(popupInfo);
  inputName.value = namePerson.textContent;
  inputAboutYou.value = aboutYou.textContent;

  popupSaveButton.classList.remove('popup__button_disabled');
  popupSaveButton.removeAttribute('disabled');
});
popupCloseButton.addEventListener('click', function () {
  closePopup(popupInfo);
});
popupAddCardOpenButton.addEventListener('click', function () {
  popupOpen(popupAddCard);
});
popupAddCardCloseButton.addEventListener('click', function () {
  closePopup(popupAddCard);
});

popupCloseButtonPhoto.addEventListener('click', function () {
  closePopup(popupPhoto);
});

//внесение изменений данных пользователя из попапа
function formSubmitHandler(evt) {
  evt.preventDefault();

  namePerson.textContent = inputName.value;
  aboutYou.textContent = inputAboutYou.value;

  closePopup(popupInfo);
}

popupInfo.addEventListener('submit', formSubmitHandler);

// закрытие на overlay
popupInfo.addEventListener('click', function () {
  closePopupByOverlayClick(popupInfo);
});

popupAddCard.addEventListener('click', function () {
  closePopupByOverlayClick(popupAddCard);
});

popupPhoto.addEventListener('click', function () {
  closePopupByOverlayClick(popupPhoto);
});
