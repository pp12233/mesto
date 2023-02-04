export default class Card {
  constructor(name, link, selector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _createCard() {
    return document
      .querySelector(this._selector)
      .content.querySelector(".elements__item")
      .cloneNode(true);
  }

  _addListeners() {
    this._cardBtn.addEventListener("click", () =>
      this._cardBtn.classList.toggle("elements__button_activ"));
    this._cardTrash.addEventListener("click", () => this._card.remove());
    this._cardImg.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link));
  }

  generateCard() {
    this._card = this._createCard();
    this._cardBtn = this._card.querySelector(".elements__button");
    this._cardTrash = this._card.querySelector(".elements__trash");
    this._cardImg = this._card.querySelector(".elements__image");
    this._cardText = this._card.querySelector(".elements__text");
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._cardText.textContent = this._name;
    this._addListeners();
    return this._card;
  }
}
