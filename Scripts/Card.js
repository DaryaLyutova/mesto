import { popupPhoto } from './constants.js';

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
