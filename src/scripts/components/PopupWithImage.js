import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImg = this._popup.querySelector(".popup__img");
    this._popupName = this._popup.querySelector(".popup__name");
  }

  open(name, link) {
    super.open();
    this._popupImg.src = link;
    this._popupImg.alt = name;
    this._popupName.textContent = name;
  }
}
