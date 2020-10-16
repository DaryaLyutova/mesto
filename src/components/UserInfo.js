export default class UserInfo {
  constructor(personInfo) {
    this._name = document.querySelector(personInfo.name);
    this._aboutPerson = document.querySelector(personInfo.aboutPerson);
    this._avatar = document.querySelector(personInfo.avatar);
  }

  getUserInfo() {
    const newPersonInfo = {
      name: this._name.textContent,
      aboutPerson: this._aboutPerson.textContent,
    };

    return newPersonInfo;
  }

  changeAvatar(avatar) {
    this._avatar.src = avatar;
  }

  setUserInfo(name, about) {
    this._name.textContent = name;
    this._aboutPerson.textContent = about;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
