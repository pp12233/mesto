export default class Card {
  constructor(name, link, selector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._selector = selector;
    this._image = (parent) => parent.querySelector(".elements__image");
    this._card = this._createCard();
    this._handleCardClick = handleCardClick;
  }

  _createCard() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".elements__item")
      .cloneNode(true);
    this._image(cardElement).src = this._link;
    this._image(cardElement).alt = this._name;
    cardElement.querySelector(".elements__text").textContent = this._name;
    return cardElement;
  }

  _addListeners(likeButton, deleteButton, imgCard) {
    likeButton.addEventListener("click", this._toggleLike);
    deleteButton.addEventListener("click", this._deleteCard);
    imgCard.addEventListener("click", () => this._handleCardClick(this._name, this._link));
  }

  _toggleLike(evt) {
    evt.target.classList.toggle("elements__button_activ");
  }

  _deleteCard(evt) {
    evt.target.closest(".elements__item").remove();
  }


  generateCard() {
    const likeButton = this._card.querySelector(".elements__button");
    const deleteButton = this._card.querySelector(".elements__trash");
    const imgCard = this._card.querySelector(".elements__image");

    this._addListeners(likeButton, deleteButton,imgCard);
    return this._card;
  }
}
