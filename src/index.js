import './pages/index.css';

import Card from './components/Card.js';
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import {
  initialCards,
  popupPhoto,
  popupAddCard,
  popupInfo,
  popupOpenButton,
  popupAddCardOpenButton,
  popupSaveButton,
  inputPlaceName,
  inputLink,
  cardsContainer,
  popupList,
  inputNamePerson,
  inputInfoAboutPerson,
} from './utils/constants.js';
import { FormValidator, selectorObj } from './components/FormValidator.js';
import { personInfo } from './components/UserInfo.js';

//функция для создания карточки места
function makeCard(name, link, { handleCardClick }, cardSelector) {
  // Создадим экземпляр карточки
  const card = new Card(name, link, { handleCardClick }, cardSelector);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  cardList.setItem(cardElement);
}

function makePopupImage(name, link, popupElement) {
  const popupImage = new PopupWithImage(name, link, popupElement);
  popupImage.popupOpen();
}

//создание списка карточек и отображение их на странице
const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      makeCard(
        item.name,
        item.link,
        {
          handleCardClick: () => {
            makePopupImage(item.name, item.link, popupPhoto);
          },
        },
        '.place'
      );
    },
  },
  cardsContainer
);

cardList.renderItems();

const popupInfoClose = new Popup(popupInfo);
popupInfoClose.setEventListeners();

const popupAddCardClose = new Popup(popupAddCard);
popupAddCardClose.setEventListeners();

const popupPhotoClose = new Popup(popupPhoto);
popupPhotoClose.setEventListeners();

//информация о пользователе
const userInfo = new UserInfo(personInfo);

//откытие попапа для внесения данных о пользователе
popupOpenButton.addEventListener('click', () => {
  popupFormInfo.popupOpen();
  formValidatorPopupInfo.resetForm();

  const getUserInfo = userInfo.getUserInfo();
  inputNamePerson.value = getUserInfo.name;
  inputInfoAboutPerson.value = getUserInfo.aboutPerson;

  popupSaveButton.classList.remove('popup__button_disabled');
  popupSaveButton.removeAttribute('disabled');
});

//обрабтка данных попапа внесения данных пользователя и его закрытие
const popupFormInfo = new PopupWithForm(popupInfo, {
  formSubmit: () => {
    userInfo.setUserInfo(inputNamePerson.value, inputInfoAboutPerson.value);
  },
});
popupFormInfo.setEventListeners();

//открытие попапа добавления карточки
popupAddCardOpenButton.addEventListener('click', () => {
  popupFormNewCard.popupOpen();
  formValidatorPopupAddCard.resetForm();
});

// добавления новой карточки с фотографией
const popupFormNewCard = new PopupWithForm(popupAddCard, {
  formSubmit: () => {
    const nameElement = inputPlaceName.value;
    const linkElement = inputLink.value;
    makeCard(
      nameElement,
      linkElement,
      {
        handleCardClick: () => {
          makePopupImage(nameElement, linkElement, popupPhoto);
        },
      },
      '.place'
    );
  },
});
popupFormNewCard.setEventListeners();

// добавление валидации
const formValidatorPopupInfo = new FormValidator(selectorObj, popupInfo);
const formValidatorPopupAddCard = new FormValidator(selectorObj, popupAddCard);
formValidatorPopupInfo.enableValidation();
formValidatorPopupAddCard.enableValidation();
