//каточки на станице
export const initialCards = [
  {
    name: 'Архыз',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

export const cardsContainer = document.querySelector('.places');
export const popupPhoto = document.querySelector('.popup_photo');

export class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
  }

  _getTemplate() {
    // забираем размеку из HTML и клонируем элемент
    const cardElement = document
      .querySelector('.place')
      .content.querySelector('.place__container')
      .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }

  // лайк карточки
  _likeCardClick() {
    this._element
      .querySelector('.place__like')
      .addEventListener('click', function (event) {
        event.target.classList.toggle('place__like_active');
      });
  }

  //удаление карточки
  _deleteCard() {
    this._element
      .querySelector('.place__delete')
      .addEventListener('click', function (event) {
        event.target.parentElement.remove();
      });
  }

  //слушатель для открытия попапа
  _setEventListenerImage() {
    this._element
      .querySelector('.place__image')
      .addEventListener('click', () => {
        popupPhoto.querySelector(
          '.popup__title-photo'
        ).textContent = this._name;
        popupPhoto.querySelector('.popup__image').src = this._link;
        popupPhoto.classList.add('popup_opened');
      });
  }

  //создаем карточку
  generateCard() {
    this._element = this._getTemplate();
    this._likeCardClick();
    this._deleteCard();
    this._setEventListenerImage();

    // Добавим данные
    this._element.querySelector('.place__image').src = this._link;
    this._element.querySelector('.place__title').textContent = this._name;

    // Вернём элемент наружу
    return this._element;
  }
}
