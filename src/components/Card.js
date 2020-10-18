export default class Card {
  constructor({ dataCard, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardSelector, myId, datalikes) {
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._likes = dataCard.likes;
    this._userId = dataCard.owner._id;
    this._id = dataCard._id;
    this._cardSelector = cardSelector;
    this._myId = myId;
    this._datalikes = datalikes;
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
      if (one._id === this._myId) {
        this._element.querySelector('.place__like').classList.add('place__like_active');
      }
    });
    if (this._userId !== this._myId) {
      this._element.querySelector('.place__delete').remove();
    }
  }

  _quantityLikes() {
    this._element.querySelector('.place__like-counter').textContent = this._likes.length;
  }

  changeLikeInfo(datalikes) {
    this._element.querySelector('.place__like').classList.toggle('place__like_active');
    this._element.querySelector('.place__like-counter').textContent = datalikes.length;
  }

  setLikesInfo() {
    if (this._element.querySelector('.place__like_active')) {
      this._state = true;
    }
    else { this._state = false; };
    this._handleLikeClick(this._id, this._state);
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
        this._handleCardClick(this._name, this._link);
      });
  }

  //удаление карточки 
  deleteCard() {
    this._element.remove();
    this._element = null;
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

    // Вернём элемент наружу
    return this._element;
  }
}
