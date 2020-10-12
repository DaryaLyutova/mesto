import { inputPlaceName } from "../utils/constants";

export default class Card {
  constructor(name, link, likes, _id, { handleCardClick }, cardSelector) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this.__id = _id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    // забираем размеку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.place__container')
      .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }

  // лайк карточки
  // _likeCardClick() {
  //   this._element
  //     .querySelector('.place__like')
  //     .classList.toggle('place__like_active');
  // }

  //удаление карточки
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  //слушатель для открытия попапа
  _setEventListenerImage() {
    this._handleCardClick();
  }

  _setEventListeners() {
    // this._element
    //   .querySelector('.place__like')
    //   .addEventListener('click', () => {
    //     this._likeCardClick();
    //   });
    this._element
      .querySelector('.place__delete')
      .addEventListener('click', () => {
        this._deleteCard();
      });
    this._element
      .querySelector('.place__image')
      .addEventListener('click', () => {
        this._setEventListenerImage();
      });
  }

  _deleteElement() {
    if (this.__id !== '87a2c0f969175984846e265f') {
      this._element.querySelector('.place__delete').remove();
    }
  }

  //создаем карточку
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._deleteElement()
    // Добавим данные
    this._element.querySelector('.place__image').src = this._link;
    this._element.querySelector('.place__title').textContent = this._name;
    this._element.querySelector('.place__like-counter').textContent = this._likes.length;
   
    // Вернём элемент наружу
    return this._element;
  }
}
