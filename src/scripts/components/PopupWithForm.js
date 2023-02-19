import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, formSubmit) {
    super(popup);
    this._form = this._popup.querySelector(".popup__form");
    this._popupInput = this._form.querySelectorAll(".popup__input");
    this._formSubmit = formSubmit;
    this._button = this._form.querySelector('.popup__btn');
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
      const buttonText = this._button.textContent;
      this._button.textContent = 'Сохранение...';
      this._formSubmit(this._getInputValues());
      this.close();
      this._button.textContent = buttonText;
    }
    );
  }


  close() {
    super.close();
    this._form.reset();
  }
}
