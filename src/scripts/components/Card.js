export default class Card {
  constructor(
    data,
    selector,
    userId,
    { handleCardClick, handleDeleteClick, handleClickLikes }
  ) {
    this._userId = userId;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._ownerIdCard = data.owner._id;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleClickLikes = handleClickLikes;
    this._handleDeleteClick = handleDeleteClick;
    this._card = this._createCard();
    this._cardImg = this._card.querySelector(".elements__image");
    this._cardText = this._card.querySelector(".elements__text");
    this._cardCounter = this._card.querySelector(".elements__counter");
    this._cardBtn = this._card.querySelector(".elements__button");
    this._cardTrash = this._card.querySelector(".elements__trash");
  }

  _createCard() {
    return document
      .querySelector(this._selector)
      .content.querySelector(".elements__item")
      .cloneNode(true);
  }

  _addListeners() {
    this._cardBtn.addEventListener("click", () => this._handleClickLikes());
    this._cardTrash.addEventListener("click", () =>
      this._handleDeleteClick(this._card)
    );
    this._cardImg.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  generateCard() {
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._cardText.textContent = this._name;
    this._card.dataset.id = this._id;
    this._addListeners();
    this.setLikes();
    this._checkTrasher();
    return this._card;
  }

  getId() {
    return this._id;
  }

  _checkTrasher() {
    if (this._ownerIdCard !== this._userId) {
      this._cardTrash.remove();
    }
  }

  setLikes() {
    this._cardCounter.textContent = this._likes.length;
    this.clickLike();
  }

  checkLike() {
    return this._likes.some((like) => like._id === this._userId);
  }

  turnLikes(card) {
    this._likes = card.likes;
    this._cardBtn.classList.toggle("elements__button_activ");
  }

  clickLike() {
    if (this.checkLike()) {
      this._cardBtn.classList.add("elements__button_activ");
    } else {
      this._cardBtn.classList.remove("elements__button_activ");
    }
  }
}
