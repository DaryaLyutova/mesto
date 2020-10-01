export const personInfo = {
  name: '.profile-info__name',
  aboutPerson: '.profile-info__activity',
};

export default class UserInfo {
  constructor(personInfo, inputUserName, inputUserInfo) {
    this._name = document.querySelector(personInfo.name);
    this._aboutPerson = document.querySelector(personInfo.aboutPerson);
    this._inputUserName = inputUserName;
    this._inputUserInfo = inputUserInfo;
  }

  getUserInfo() {
    const newPersonInfo = {
      name: this._name.textContent,
      aboutPerson: this._aboutPerson.textContent,
    };

    return newPersonInfo;
  }

  setUserInfo() {
    this._name.textContent = this._inputUserName.value;
    this._aboutPerson.textContent = this._inputUserInfo.value;
  }
}
