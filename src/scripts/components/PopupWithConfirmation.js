import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popup, deleteHandler) {
    super(popup);
    this._btnApproval = this._popup.querySelector(".popup__btn_approval");
    this._deleteHandler = deleteHandler;
  }

  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._btnApproval.addEventListener("click", () =>
      this._deleteHandler(this._card)
    );
  }
}
