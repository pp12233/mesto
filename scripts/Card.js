import { openPopup } from './index.js';

export default class Card {
  constructor(name, link, selector) {
    this._name = name;
    this._link = link;
    this._selector = selector;
    this._card = this._createCard();
  }

  _createCard() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.elements__item').cloneNode(true);
    cardElement.querySelector('.elements__image').src = this._link;
    cardElement.querySelector('.elements__image').alt = this._name;
    cardElement.querySelector('.elements__text').textContent = this._name;
    return cardElement;
  }


  _addListeners(likeButton, deleteButton, image) {
    likeButton.addEventListener('click', this._toggleLike);
    deleteButton.addEventListener('click', this._deleteCard);
    image.addEventListener('click', this._showImagePopup);
  }

  _toggleLike(evt) {
    evt.target.classList.toggle('elements__button_activ');
  }

  _deleteCard(evt) {
    evt.target.closest('.elements__item').remove();
  }

  _showImagePopup(evt) {
    const popapGallery = document.querySelector('.popup_gallery');
    const popapImgGallery = popapGallery.querySelector('.popup__img');
    const popupNameGallery = popapGallery.querySelector('.popup__name');

    openPopup(popapGallery);

    popapImgGallery.src = evt.target.getAttribute('src');
    popapImgGallery.alt = evt.target.getAttribute('alt');

    const titleCard = evt.target.closest('.elements__item').querySelector('.elements__text');
    popupNameGallery.textContent = titleCard.textContent;

  }


  generateCard() {
    const likeButton = this._card.querySelector('.elements__button');
    const deleteButton = this._card.querySelector('.elements__trash');
    const image = this._card.querySelector('.elements__image');

    this._addListeners(likeButton, deleteButton, image);
    return this._card;
  }
}

