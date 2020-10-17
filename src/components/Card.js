export default class Card {
  constructor({ dataCard, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardSelector) {
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._likes = dataCard.likes;
    this._userId = dataCard.owner._id;
    this._id = dataCard._id;
    this._cardSelector = cardSelector;
    // this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
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
  _activElemets() {
    this._likes.forEach((one) => {
      if (one._id === '87a2c0f969175984846e265f') {
        this._element.querySelector('.place__like').classList.add('place__like_active');
      }
    });
    if (this._userId !== '87a2c0f969175984846e265f') {
      this._element.querySelector('.place__delete').remove();
    }
  }

  _quantityLikes() {
    this._element.querySelector('.place__like-counter').textContent = this._likes.length;
  }

  setLikesInfo() {
    if (this._element.querySelector('.place__like_active')) {
      this._state = true;
    }
    else { this._state = false; };
    this._handleLikeClick(this._id, this._state, this._element);
  }

  _setEventListeners() {
    this._element.querySelector('.place__like')
      .addEventListener('click', () => {
        this.setLikesInfo();
      });
    this._element
      .querySelector('.place__delete')
      .addEventListener('click', () => {
        this._handleDeleteIconClick(this._id);
      });
    this._element
      .querySelector('.place__image')
      .addEventListener('click', () => {
        this._handleCardClick();
      });
  }

  //создаем карточку
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._activElemets();
    // Добавим данные
    this._element.querySelector('.place__image').src = this._link;
    this._element.querySelector('.place__title').textContent = this._name;
    this._quantityLikes();
    // this.setLikesInfo();

    // Вернём элемент наружу
    return this._element;
  }
}
