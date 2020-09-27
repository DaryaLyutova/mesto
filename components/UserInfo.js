import { inputName, inputinfoAboutPerson } from '../utils/constants.js';

export const personInfo = {
  name: '.profile-info__name',
  aboutPerson: '.profile-info__activity',
};

export default class UserInfo {
  constructor(personInfo) {
    this._name = document.querySelector(personInfo.name);
    this._aboutPerson = document.querySelector(personInfo.aboutPerson);
    this._inputName = inputName;
    this._inputinfoAboutPerson = inputinfoAboutPerson;
  }

  getUserInfo() {
    this._inputName.value = this._name.textContent;
    this._inputinfoAboutPerson.value = this._aboutPerson.textContent;
  }

  setUserInfo() {
    this._name.textContent = this._inputName.value;
    this._aboutPerson.textContent = this._inputinfoAboutPerson.value;
  }
}
