import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, formSubmit) {
    super(selectorPopup);
    this._form = this._selectorPopup.querySelector(".popup__form");
    this._popupInput = this._form.querySelectorAll(".popup__input");
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    const inputValue = {};

    this._popupInput.forEach((input) => {
      inputValue[input.name] = input.value;
    });

    return inputValue;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmit(evt, this._getInputValues());
      this.close()}
    );

  }

  close() {
    super.close();
    this._form.reset();
  }
}