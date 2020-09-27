import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
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
  namePerson,
  infoAboutPerson,
  inputName,
  inputinfoAboutPerson,
} from '../utils/constants.js';
import { FormValidator, selectorObj } from '../components/FormValidator.js';
import { personInfo } from '../components/UserInfo.js';

//функция для создания карточки места
function makeCard(name, link, { handleCardClick }, cardSelector) {
  // Создадим экземпляр карточки
  const card = new Card(name, link, { handleCardClick }, cardSelector);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  cardList.setItem(cardElement);
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
            const popupImage = new PopupWithImage(
              item.name,
              item.link,
              popupPhoto
            );
            popupImage.popupOpen();
          },
        },
        '.place'
      );
    },
  },
  cardsContainer
);

cardList.renderItems();

//закрытие попапов на кнопку "закрыть"
const popupCloseButtonList = new Section({
  data: popupList,
  renderer: (item) => {
    const popup = new Popup(item);
    popup.closePopup();
  },
});

popupCloseButtonList.renderItems();

//информация о пользователе
// const userInfo = new UserInfo(personInfo);

//откытие попапа для внесения данных о пользователе

popupOpenButton.addEventListener('click', () => {
  const popupInfoOpen = new Popup(popupInfo);
  popupInfoOpen.popupOpen();
  formValidatorPopupInfo.resetForm();

  userInfo.getUserInfo();
  popupSaveButton.classList.remove('popup__button_disabled');
});

//обрабтка данных попапа внесения данных пользователя и его закрытие
const popupFormInfo = new PopupWithForm(popupInfo, {
  formSubmit: () => {
    userInfo.setUserInfo();
  },
});
popupFormInfo.closePopup();

//открытие попапа добавления карточки
popupAddCardOpenButton.addEventListener('click', () => {
  const popupCaddAddOpen = new Popup(popupAddCard);
  popupCaddAddOpen.popupOpen();
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
          const popupImage = new PopupWithImage(
            nameElement,
            linkElement,
            popupPhoto
          );
          popupImage.popupOpen();
        },
      },
      '.place'
    );
  },
});
popupFormNewCard.closePopup();

// добавление валидации
const formValidatorPopupInfo = new FormValidator(selectorObj, popupInfo);
const formValidatorPopupAddCard = new FormValidator(selectorObj, popupAddCard);
formValidatorPopupInfo.enableValidation();
formValidatorPopupAddCard.enableValidation();
