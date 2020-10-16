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
} from './../utils/constants.js';
import { FormValidator, selectorObj } from './../components/FormValidator.js';
import { personInfo } from './../components/UserInfo.js';
import Api from './../components/Api.js';
import PopupWithSubmit from './../components/PopupWithSubmit.js'

const apiUserInfo = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16/users/me',
  headers: {
    authorization: 'db246294-1b1a-41e2-ab61-b5ce8b44318f',
    'Content-Type': 'application/json',
  },
});

//информация о пользователе
const userInfo = new UserInfo(personInfo);
const apiUser = apiUserInfo.getUserInfo();
apiUser
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
    renderLoading(true);
    apiUserAvatar.patchUserAvatar({ avatar: avatarPerson })
      .then(() => {
        return document.querySelector('.avatar').src = avatarPerson;
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

const apiCards = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16/cards',
  headers: {
    authorization: 'db246294-1b1a-41e2-ab61-b5ce8b44318f',
    'Content-Type': 'application/json',
  },
});

const cards = apiCards.getInitialCards();

const apiLikeCard = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16/cards/likes/',
  headers: {
    authorization: 'db246294-1b1a-41e2-ab61-b5ce8b44318f',
    'Content-Type': 'application/json',
  },
});


//функция для создания карточки места
function makeCard({ dataCard, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardSelector, elementsList) {
  // Создадим экземпляр карточки
  const card = new Card({ dataCard, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardSelector);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // Добавляем в DOM
  elementsList.setItem(cardElement);
}


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
              return apiUser.then((dataUser) => {
                if (item.likes.length === 0) {
                  apiLikeCard.putLikeCard(item._id);
                }
                else {
                  item.likes.forEach((one) => {
                    if (one._id === dataUser._id) {
                      apiLikeCard.deleteLikeCard(item._id);
                    }
                    else {
                      apiLikeCard.putLikeCard(item._id);
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
                  apiCards.deleteCard(item._id);
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
        apiCards.makeNewCard({ name: nameElement, link: linkElement })
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
                    apiLikeCard.putLikeCard(data._id);
                  }
                  else {
                    data.likes.forEach((one) => {
                      if (one._id !== dataUser._id) {
                        apiLikeCard.putLikeCard(data._id);
                      }
                      else {
                        apiLikeCard.deleteLikeCard(data._id);
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
                    apiCards.deleteCard(data._id);
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
