import './index.css';
import Card from './../components/Card.js';
import Section from './../components/Section.js';
import PopupWithImage from './../components/PopupWithImage.js';
import PopupWithForm from './../components/PopupWithForm.js';
import UserInfo from './../components/UserInfo.js';
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
  selectorObj,
  personInfo
} from './../utils/constants.js';
import FormValidator from './../components/FormValidator.js';
import Api from './../components/Api.js';
import PopupWithSubmit from './../components/PopupWithSubmit.js'

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: 'db246294-1b1a-41e2-ab61-b5ce8b44318f',
    'Content-Type': 'application/json',
  },
});

//информация о пользователе
const userInfo = new UserInfo(personInfo);
const apiUser = api.getUserInfo();
apiUser
  .then((data) => {
    userInfo.setUserInfo(data.name, data.about);
    userInfo.setUserAvatar(data.avatar);
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
    api
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

popupAvatarOpenButton.addEventListener('click', () => {
  popupFormAvatar.popupOpen();
  formValidatorPopupAvatar.resetForm();
});

const popupFormAvatar = new PopupWithForm(popupAvatar, {
  formSubmit: () => {
    const avatarPerson = inputAvatar.value;
    renderLoading(true);
    api.patchUserAvatar({ avatar: avatarPerson })
      .then(() => {
        return userInfo.changeAvatar(avatarPerson)
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        renderLoading(false);
      });
  },
});
popupFormAvatar.setEventListeners();

//функция для создания карточки места
function makeCard({ dataCard, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardSelector, userId, elementsList) {
  // Создадим экземпляр карточки
  const card = new Card({ dataCard, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardSelector, userId);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // Добавляем в DOM
  elementsList.setItem(cardElement);
};

const apiCards = api.getInitialCards();
//действия с карточками
Promise.all([apiUser, apiCards])
  .then((values) => {    //попадаем сюда когда оба промиса будут выполнены
    const [userData, initialCards] = values;
    return [userData, initialCards]
  })
  .then(([userData, initialCards]) => {
    const userId = userData._id;
    //создание списка карточек и отображение их на странице
    const cardList = new Section(
      {
        data: initialCards,
        renderer: (card) => {
          makeCard({
            dataCard: {
              name: card.name,
              link: card.link,
              likes: card.likes,
              _id: card.owner._id
            },
            handleCardClick: () => {
              popupImage.popupOpen(card.name, card.link);
            },
            handleLikeClick: () => {
              if (card.likes.length === 0) {
                api.putLikeCard(card._id);
              }
              else {
                card.likes.forEach((one) => {
                  if (one._id === userId) {
                    api.deleteLikeCard(card._id);
                  }
                  else {
                    api.putLikeCard(card._id);
                  }
                })
              }
            },
            handleDeleteIconClick: () => {
              const popupWithSubmit = new PopupWithSubmit(popupSubmit, {
                formSubmit: () => {
                  api.deleteCard(card._id);
                }
              });
              popupWithSubmit.popupOpen();
              popupWithSubmit.setEventListeners();
            }
          },
            '.place', userId, cardList);
        },
      },
      cardsContainer
    );
    return cardList
  })
  .then((cardList) => {
    cardList.renderItems();
    return cardList
  })
  .then((cardList) => {
    // добавления новой карточки с фотографией
    const popupFormNewCard = new PopupWithForm(popupAddCard, {
      formSubmit: () => {
        const nameElement = inputPlaceName.value;
        const linkElement = inputLink.value;
        renderLoading(true);
        api.makeNewCard({ name: nameElement, link: linkElement })
          .then((data) => {
            return makeCard({
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
                return apiUser.then((dataUser) => {
                  if (data.likes.length === 0) {
                    api.putLikeCard(data._id);
                  }
                  else {
                    data.likes.forEach((one) => {
                      if (one._id !== dataUser._id) {
                        api.putLikeCard(data._id);
                      }
                      else {
                        api.deleteLikeCard(data._id);
                      }
                    })
                  }
                }).catch((err) => {
                  alert(err);
                });
              },
              handleDeleteIconClick: () => {
                const popupWithSubmit = new PopupWithSubmit(popupSubmit, {
                  formSubmit: () => {
                    api.deleteCard(data._id);
                  }
                });
                popupWithSubmit.popupOpen();
                popupWithSubmit.setEventListeners();
              }
            },
              '.place', cardList
            );

          })
          .catch((err) => {
            alert(err);
          })
          .finally(() => {
            renderLoading(false);
          });
      },
    });
    return popupFormNewCard
  })
  .then((popupFormNewCard) => {
    popupFormNewCard.setEventListeners();
    return popupFormNewCard
  })
  .then((popupFormNewCard) => {
    return popupAddCardOpenButton.addEventListener('click', () => {
      popupFormNewCard.popupOpen();
      formValidatorPopupAddCard.resetForm();
    });
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

function renderLoading(isLoading) {
  if (isLoading) {
    popupSaveButton.innerText = 'Сохранение...';
  } else {
    popupSaveButton.innerText = 'Сохранение';
  }
}
