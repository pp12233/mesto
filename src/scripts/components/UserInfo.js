export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
    this._userId = null;
  }

  getUserInfo() {
    const user = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    };
    return user;
  }

  setUserInfo({ name, about, avatar, _id }) {
    (this._name.textContent = name),
      (this._about.textContent = about),
      (this._avatar.src = avatar),
      (this._userId = _id);
  }

  getUserId() {
    return this._userId;
  }
}
