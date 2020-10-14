export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _showErrow(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._url, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._showErrow(res));
  }

  patchUserInfo(data) {
    return fetch(this._url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._showErrow(res));
  }

  patchUserAvatar(data) {
    return fetch(this._url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._showErrow(res));
  }

  getInitialCards() {
    return fetch(this._url, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._showErrow(res));
  }

  makeNewCard(data) {
    return fetch(this._url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._showErrow(res));
  }

  putLikeCard(id) {
    return fetch(`${this._url}${id}`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => this._showErrow(res));
  }

  deleteLikeCard(id) {
    return fetch(`${this._url}${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._showErrow(res));
  }

  getLikeCard(id) {
    return fetch(`${this._url}${id}`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this._showErrow(res));
  }

  deleteCard(id) {
    return fetch(`${this._url}/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._showErrow(res));
  }



}

