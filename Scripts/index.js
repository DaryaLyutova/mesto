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
  popupCloseButtonPhoto,
  inputPlaceName,
  inputLink,
  cardsContainer,
} from './constants.js';
import { FormValidator, selectorObj } from './FormValidator.js';
import { popupOpen, closePopup } from './utils.js';

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
const formValidatorPopupInfo = new FormValidator(selectorObj, popupInfo);
const formValidatorPopupAddCard = new FormValidator(selectorObj, popupAddCard);

// добавления новой карточки с фотографией
popupAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const nameElement = inputPlaceName.value;
  const linkElement = inputLink.value;

  makeCard(nameElement, linkElement, '.place');

  closePopup(popupAddCard);

  popupAddCard.reset();
});

//вызов функций открытия/закрытия и обработки данных попапов
popupOpenButton.addEventListener('click', function () {
  popupOpen(popupInfo);
  formValidatorPopupInfo.enableValidation();
  formValidatorPopupInfo.resetForm();
  inputName.value = namePerson.textContent;
  inputAboutYou.value = aboutYou.textContent;
  popupSaveButton.classList.remove('popup__button_disabled');
});
popupCloseButton.addEventListener('click', function () {
  closePopup(popupInfo);
});
popupAddCardOpenButton.addEventListener('click', function () {
  popupOpen(popupAddCard);
  formValidatorPopupAddCard.enableValidation();
  formValidatorPopupAddCard.resetForm();
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
