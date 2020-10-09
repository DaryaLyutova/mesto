export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(this._url, {
      metod: 'GET',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getInitialCards() {
    return fetch(this._url, {
      metod: 'GET',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // другие методы работы с API
}
