const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elementsList = document.querySelector('.elements__list');
const popapGallery = document.querySelector('.popup_gallery');
const templateItemContent = document.querySelector('#mesto').content;
const templateItem = templateItemContent.querySelector('.elements__item');


initialCards.forEach(function(item) {
  const cloneTemplateItem = templateItem.cloneNode(true);
  cloneTemplateItem.querySelector('.elements__image').src = item.link;
  cloneTemplateItem.querySelector('.elements__text').textContent = item.name;
  elementsList.append(cloneTemplateItem);
});



// функция смены класса кнопки лайк

elementsList.addEventListener('click', function(evt) {
if(evt.target.classList.contains('elements__button')) {
  evt.target.classList.toggle('elements__button_activ')
}
if(evt.target.classList.contains('elements__trash')) {
  evt.target.closest('.elements__item').remove();
}
if(evt.target.classList.contains('elements__image')) {
  popapGallery.classList.add('popup_opened');
  popapGallery.querySelector('.popup__img').src=evt.target.getAttribute('src');
  const titleCard = evt.target.closest('.elements__item').querySelector('.elements__text');
  popapGallery.querySelector('.popup__name').textContent = titleCard.textContent;
}
});


// Находим форму в DOM
const popupEdit = document.querySelector('.popup_edit');
const popupCreate = document.querySelector('.popup_create');
let formElement = popupEdit.querySelector('.popup__form');
let formCreateElement = popupCreate.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');

let cityInput = formCreateElement.querySelector('.popup__input_type_city');
let linkInput = formCreateElement.querySelector('.popup__input_type_link');

const profileButton = document.querySelector('.profile__edit');
const createButton = document.querySelector('.profile__add');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileContent = document.querySelector('.profile__content');


// открытие попапа
function openPopup(win) {
  win.classList.add('popup_opened');
}

function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileContent.textContent;
  openPopup(popupEdit);
}

function openCreatePopup() {
  openPopup(popupCreate);
}

profileButton.addEventListener('click', openEditPopup);
createButton.addEventListener('click', openCreatePopup);


// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


popupCloseButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});


/*
//закрытие по клику на фон
const closePopupByClickOverlay = function(event) {
  if (event.target.classList.contains('popup')) {
    popupClosed();
  }
}

popup.addEventListener('click', closePopupByClickOverlay);
*/

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    const jobInputValue = jobInput.value;
    const nameInputValue = nameInput.value;

    profileName.textContent = nameInputValue;
    profileContent.textContent = jobInputValue;

    formElement.closest('.popup').classList.remove('popup_opened');
}

function formSubmitCreateHandler (evt) {
  evt.preventDefault();
  const cityInputValue = cityInput.value;
  const linkInputValue = linkInput.value;
  const cloneTemplateItem = templateItem.cloneNode(true);
  cloneTemplateItem.querySelector('.elements__image').src = linkInputValue;
  cloneTemplateItem.querySelector('.elements__text').textContent = cityInputValue;
  elementsList.append(cloneTemplateItem);
  closePopup(formCreateElement.closest('.popup'));
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
formCreateElement.addEventListener('submit', formSubmitCreateHandler);

