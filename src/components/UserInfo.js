export default class UserInfo {
  constructor(personInfo) {
    this._name = document.querySelector(personInfo.name);
    this._aboutPerson = document.querySelector(personInfo.aboutPerson);
  }

  getUserInfo() {
    const newPersonInfo = {
      name: this._name.textContent,
      aboutPerson: this._aboutPerson.textContent,
    };

    return newPersonInfo;
  }

  setUserInfo(name, about) {
    this._name.textContent = name;
    this._aboutPerson.textContent = about;
  }
}
