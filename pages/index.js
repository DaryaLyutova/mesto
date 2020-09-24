import { Card } from '../components/Card.js';
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
  popupList,
} from '../utils/constants.js';
import { FormValidator, selectorObj } from '../components/FormValidator.js';
// import { popupOpen, closePopup } from '../utils/utils.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';

// //добавление карточки
// //функция для создания карточки иеста
// function makeCard(name, link, cardSelector) {
//   // Создадим экземпляр карточки
//   const card = new Card(name, link, cardSelector);
//   // Создаём карточку и возвращаем наружу
//   const cardElement = card.generateCard();

//   // Добавляем в DOM
//   cardList.setItem(cardElement);
// }

const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(
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
      // Создаём карточку и возвращаем наружу
      const cardElement = card.generateCard();

      // Добавляем в DOM
      cardList.setItem(cardElement);
    },
  },
  cardsContainer
);

cardList.renderItems();

const popupCloseButtonList = new Section({
  data: popupList,
  renderer: (item) => {
    const popup = new Popup(item);
    popup.closePopup();
  },
});

popupCloseButtonList.renderItems();
// //добавление валидации
// const formValidatorPopupInfo = new FormValidator(selectorObj, popupInfo);
// const formValidatorPopupAddCard = new FormValidator(selectorObj, popupAddCard);
// formValidatorPopupInfo.enableValidation();
// formValidatorPopupAddCard.enableValidation();

// // добавления новой карточки с фотографией
// popupAddCard.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   const nameElement = inputPlaceName.value;
//   const linkElement = inputLink.value;

//   makeCard(nameElement, linkElement, '.place');

//   closePopup(popupAddCard);

//   popupAddCard.reset();
// });

// //вызов функций открытия/закрытия и обработки данных попапов
// popupOpenButton.addEventListener('click', function () {
//   popupOpen(popupInfo);

//   formValidatorPopupInfo.resetForm();
//   inputName.value = namePerson.textContent;
//   inputAboutYou.value = aboutYou.textContent;
//   popupSaveButton.classList.remove('popup__button_disabled');
// });
// popupCloseButton.addEventListener('click', function () {
//   closePopup(popupInfo);
// });
// popupAddCardOpenButton.addEventListener('click', function () {
//   popupOpen(popupAddCard);

//   formValidatorPopupAddCard.resetForm();
// });
// popupAddCardCloseButton.addEventListener('click', function () {
//   closePopup(popupAddCard);
// });

// popupCloseButtonPhoto.addEventListener('click', function () {
//   closePopup(popupPhoto);
// });

// //внесение изменений данных пользователя из попапа
// function formSubmitHandler(evt) {
//   evt.preventDefault();

//   namePerson.textContent = inputName.value;
//   aboutYou.textContent = inputAboutYou.value;

//   closePopup(popupInfo);
// }

// popupInfo.addEventListener('submit', formSubmitHandler);
