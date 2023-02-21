import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, formSubmit) {
    super(popup);
    this._form = this._popup.querySelector(".popup__form");
    this._popupInput = this._form.querySelectorAll(".popup__input");
    this._formSubmit = formSubmit;
    this._button = this._form.querySelector(".popup__btn");
    this._submitBtnText = this._button.textContent;
  }

  _getInputValues() {
    const inputValue = {};

    this._popupInput.forEach((input) => {
      inputValue[input.name] = input.value;
    });

    return inputValue;
  }

  _renderLoading(isLoading, loadingText = "Сохранение...") {
    if (isLoading) {
      this._button.textContent = loadingText;
    } else {
      this._button.textContent = this._submitBtnText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._renderLoading(true);
      this._formSubmit(this._getInputValues())
        .then(() => this.close())
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this._renderLoading(false);
        });
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
