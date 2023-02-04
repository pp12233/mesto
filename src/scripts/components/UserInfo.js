export default class UserInfo {
  constructor({ selectorName, selectorInfo }) {
    this._selectorName = document.querySelector(selectorName);
    this._selectorInfo = document.querySelector(selectorInfo);
  }

  getUserInfo() {
    const user = {
      name: this._selectorName.textContent,
      info: this._selectorInfo.textContent
    };
    return user;
  }

  setUserInfo(name, info) {
    this._selectorName.textContent = name,
    this._selectorInfo.textContent = info
  }
}
