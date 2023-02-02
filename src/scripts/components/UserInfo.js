export default class UserInfo {
  constructor({ selectorName, selectorInfo }) {
    this._selectorName = selectorName;
    this._selectorInfo = selectorInfo;
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
