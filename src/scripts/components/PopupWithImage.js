import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popupImg = this._selectorPopup.querySelector(".popup__img");
    this._popupName = this._selectorPopup.querySelector(".popup__name");
  }

  open(name, link) {
    super.open();
    this._popupName.textContent = name;
    this._popupImg.src = link;
    this._popupImg.alt = name;
  }
}
