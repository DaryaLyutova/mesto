import './pages/index.css';
import Card from './components/Card.js';
import Section from './components/Section.js';
import Popup from './components/Popup.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import {
  popupPhoto,
  popupAddCard,
  popupInfo,
  popupAvatar,
  popupSubmit,
  popupOpenButton,
  popupAvatarOpenButton,
  popupAddCardOpenButton,
  popupSaveButton,
  inputPlaceName,
  inputLink,
  namePerson,
  infoAboutPerson,
  avatar,
  cardsContainer,
  inputNamePerson,
  inputInfoAboutPerson,
  inputAvatar,
  likesCounter,
} from './utils/constants.js';
import { FormValidator, selectorObj } from './components/FormValidator.js';
import { personInfo } from './components/UserInfo.js';
import Api from './components/Api.js';
import PopupWithSubmit from './components/PopupWithSubmit.js'

const apiUserInfo = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16/users/me',
  headers: {
    authorization: 'db246294-1b1a-41e2-ab61-b5ce8b44318f',
    'Content-Type': 'application/json',
  },
});

//информация о пользователе
const userInfo = new UserInfo(personInfo);

apiUserInfo
  .getUserInfo()
  .then((data) => {
    namePerson.textContent = data.name;
    infoAboutPerson.textContent = data.about;
    avatar.src = data.avatar;
  })
  .catch((err) => {
    alert(err);
  });

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
    const namePerson = inputNamePerson.value;
    const aboutPerson = inputInfoAboutPerson.value;
    apiUserInfo
      .patchUserInfo({ name: namePerson, about: aboutPerson })
      .then(() => {
        return userInfo.setUserInfo(namePerson, aboutPerson);
      })
      .catch((err) => {
        alert(err);
      });

  },
});
popupFormInfo.setEventListeners();

// попап с аватаром
const apiUserAvatar = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16/users/me/avatar',
  headers: {
    authorization: 'db246294-1b1a-41e2-ab61-b5ce8b44318f',
    'Content-Type': 'application/json',
  },
});

popupAvatarOpenButton.addEventListener('click', () => {
  popupFormAvatar.popupOpen();
  formValidatorPopupAvatar.resetForm();
});

const popupFormAvatar = new PopupWithForm(popupAvatar, {
  formSubmit: () => {
    const avatarPerson = inputAvatar.value;
    apiUserAvatar.patchUserAvatar({ avatar: avatarPerson }).then(() => {
      return document.querySelector('.avatar').src = avatarPerson;
    })
      .catch((err) => {
        alert(err);
      });
  },
});
popupFormAvatar.setEventListeners();

const apiCards = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16/cards',
  headers: {
    authorization: 'db246294-1b1a-41e2-ab61-b5ce8b44318f',
    'Content-Type': 'application/json',
  },
});

const cards = apiCards.getInitialCards();

//функция для создания карточки места
function makeCard({ dataCard, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardSelector, elementsList) {
  // Создадим экземпляр карточки
  const card = new Card({ dataCard, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardSelector);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // Добавляем в DOM
  elementsList.setItem(cardElement);
}

const apiLikeCard = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16/cards/likes/',
  headers: {
    authorization: 'db246294-1b1a-41e2-ab61-b5ce8b44318f',
    'Content-Type': 'application/json',
  },
});

//действия с карточками
cards
  .then((data) => {
    //создание списка карточек и отображение их на странице
    const cardList = new Section(
      {
        data: data,
        renderer: (item) => {
          makeCard({
            dataCard: {
              name: item.name,
              link: item.link,
              likes: item.likes,
              _id: item.owner._id
            },
            handleCardClick: () => {
              popupImage.popupOpen(item.name, item.link);
            },
            handleLikeClick: () => {
              apiLikeCard.putLikeCard(item._id);
            },
            handleDeleteIconClick: () => {
              const popupWithSubmit = new PopupWithSubmit(popupSubmit, {
                formSubmit: () => {
                  apiCards.deleteCard(item._id);
                  //  this._element.remove();
                  //  this._element = null;                  
                }
              });
              popupWithSubmit.popupOpen();
              popupWithSubmit.setEventListeners();
            }
          },
            '.place', cardList);
        },
      },
      cardsContainer
    );
    cardList.renderItems();

    popupAddCardOpenButton.addEventListener('click', () => {
      popupFormNewCard.popupOpen();
      formValidatorPopupAddCard.resetForm();
    });
    // добавления новой карточки с фотографией
    const popupFormNewCard = new PopupWithForm(popupAddCard, {
      formSubmit: () => {
        const nameElement = inputPlaceName.value;
        const linkElement = inputLink.value;
        const likesElement = [];
        // const idElement = '87a2c0f969175984846e265f';
        apiCards.makeNewCard({ name: nameElement, link: linkElement })
          .then((data) => {
            makeCard({
              dataCard: {
                name: data.name,
                link: data.link,
                likes: data.likes,
                _id: data.owner._id
              },
              handleCardClick: () => {
                popupImage.popupOpen(nameElement, linkElement, popupPhoto);
              },
              handleLikeClick: () => {
                apiLikeCard.putLikeCard(likesElement);
              },
              handleDeleteIconClick: () => {
                const popupWithSubmit = new PopupWithSubmit(popupSubmit, {
                  formSubmit: () => {
                    apiCards.deleteCard(data._id);
                  }
                });
                popupWithSubmit.popupOpen();
                popupWithSubmit.setEventListeners();
              }
            },
              '.place', cardList
            );
          });
      },
    });
    return popupFormNewCard.setEventListeners();
  })
  .catch((err) => {
    alert(err);
  });

const popupImage = new PopupWithImage(popupPhoto);
popupImage.setEventListeners();


// добавление валидации
const formValidatorPopupInfo = new FormValidator(selectorObj, popupInfo);
const formValidatorPopupAddCard = new FormValidator(selectorObj, popupAddCard);
const formValidatorPopupAvatar = new FormValidator(selectorObj, popupAvatar);
formValidatorPopupInfo.enableValidation();
formValidatorPopupAddCard.enableValidation();
formValidatorPopupAvatar.enableValidation();

// function renderLoading(isLoading) {
//   if (isLoading) {
//     popupSaveButton.innerText = 'Сохранение...';
//     console.log(popupSaveButton);
//   } else {
//     popupSaveButton.innerText = 'Сохранение';
//     console.log(popupSaveButton);
//   }
// }
