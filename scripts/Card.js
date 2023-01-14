import { openPopup } from "../utils/utils.js";

const popupGallery = document.querySelector(".popup_gallery");
const popupImgGallery = popupGallery.querySelector(".popup__img");
const popupNameGallery = popupGallery.querySelector(".popup__name");

export default class Card {
  constructor(name, link, selector) {
    this._name = name;
    this._link = link;
    this._selector = selector;
    this._image = (parent) => parent.querySelector(".elements__image");
    this._card = this._createCard();
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

  _addListeners(likeButton, deleteButton, image) {
    likeButton.addEventListener("click", this._toggleLike);
    deleteButton.addEventListener("click", this._deleteCard);
    image.addEventListener("click", this._showImagePopup);
  }

  _toggleLike(evt) {
    evt.target.classList.toggle("elements__button_activ");
  }

  _deleteCard(evt) {
    evt.target.closest(".elements__item").remove();
  }

  _showImagePopup = (evt) => {
    openPopup(popupGallery);

    popupNameGallery.textContent = this._name;

    popupImgGallery.src = evt.target.getAttribute("src");
    popupImgGallery.alt = evt.target.getAttribute("alt");
  };

  generateCard() {
    const likeButton = this._card.querySelector(".elements__button");
    const deleteButton = this._card.querySelector(".elements__trash");
    const image = this._card.querySelector(".elements__image");

    this._addListeners(likeButton, deleteButton, image);
    return this._card;
  }
}
