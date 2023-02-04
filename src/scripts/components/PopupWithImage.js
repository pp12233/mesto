import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popupSelector.querySelector(".popup__img");
    this._popupName = this._popupSelector.querySelector(".popup__name");
  }

  open(name, link) {
    super.open();
    this._popupImg.src = link;
    this._popupImg.alt = name;
    this._popupName.textContent = name;
  }
}
