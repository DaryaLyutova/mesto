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
  infoAboutPerson,
  inputName,
  inputinfoAboutPerson,
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
import PopupWithForm from '../components/PopupWithForm.js';

// //добавление карточки
// //функция для создания карточки места
function makeCard(name, link, { handleCardClick }, cardSelector) {
  // Создадим экземпляр карточки
  const card = new Card(name, link, { handleCardClick }, cardSelector);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  cardList.setItem(cardElement);
}

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
      // // Создаём карточку и возвращаем наружу
      // const cardElement = card.generateCard();

      // // Добавляем в DOM
      // cardList.setItem(cardElement);
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

//откытие попапа для внесения данных о пользователе
popupOpenButton.addEventListener('click', () => {
  const popupInfoOpen = new Popup(popupInfo);
  popupInfoOpen.popupOpen();
  formValidatorPopupInfo.resetForm();
  inputName.value = namePerson.textContent;
  inputinfoAboutPerson.value = infoAboutPerson.textContent;
  popupSaveButton.classList.remove('popup__button_disabled');
});

//обрабтка данных попапа внесения данных пользователя и его закрытие
const popupFormInfo = new PopupWithForm(popupInfo, {
  formSubmit: () => {
    namePerson.textContent = inputName.value;
    infoAboutPerson.textContent = inputinfoAboutPerson.value;
  },
});
popupFormInfo.closePopup();

//открытиу попапа добавления карточки
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

// // добавления новой карточки с фотографией
// popupAddCard.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   const nameElement = inputPlaceName.value;
//   const linkElement = inputLink.value;

//   makeCard(nameElement, linkElement, '.place');

//   closePopup(popupAddCard);

//   popupAddCard.reset();
// });

// popupInfo.addEventListener('submit', formSubmitHandler);

// popupAddCardOpenButton.addEventListener('click', function () {
//   popupOpen(popupAddCard);

//   formValidatorPopupAddCard.resetForm();
// });
