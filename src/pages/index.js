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
      .then(() => {
        return popupFormInfo.closePopup();
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
        return userInfo.setUserAvatar(avatarPerson)
      })
      .then(() => {
        return popupFormAvatar.closePopup();
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
function makeCard({ dataCard }, cardSelector, myId, elementsList) {
  // Создадим экземпляр карточки
  const card = new Card({
    dataCard, handleCardClick: (name, link) => {
      popupImage.popupOpen(name, link);
    }, handleLikeClick: (id, state) => {
      if (state === true) {
        return api.deleteLikeCard(id)
          .then((data) => {
            return card.changeLikeInfo(data.likes);
          }).catch((err) => {
            alert(err);
          })
      } else {
        return api.putLikeCard(id).then((data) => {
          return card.changeLikeInfo(data.likes);
        }).catch((err) => {
          alert(err);
        })
      }
    }, handleDeleteIconClick: (id) => {
      // popupWithSubmit.popupOen();
      const popupWithSubmit = new PopupWithSubmit(popupSubmit, {
        formSubmit: () => {
          return api.deleteCard(id)
            .then(() => {
              return card.deleteCard()
            })
            .then(() => {
              return popupWithSubmit.closePopup();
            })
            .catch(err => console.log(`При удалении карточки: ${err}`));
        }
      });
      popupWithSubmit.popupOpen();
      popupWithSubmit.setEventListeners();
    }
  }, cardSelector, myId);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // Добавляем в DOM
  elementsList.setItem(cardElement);
};

//информация о пользователе
const userInfo = new UserInfo(personInfo);

//действия с карточками
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((values) => {
    const [userData, initialCards] = values;
    return [userData, initialCards]
  }).then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    return [userData, initialCards]
  })
  .then(([userData, initialCards]) => {

    const myId = userData._id;
    //создание списка карточек и отображение их на странице
    const cardList = new Section(
      {
        data: initialCards,
        renderer: (item) => {
          makeCard({
            dataCard: item
          },
            '.place', myId, cardList);
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
              dataCard: data
            },
              '.place', data.owner._id, cardList
            );
          })
          .then(() => {
            return popupFormNewCard.closePopup();
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
