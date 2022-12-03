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


let allTemplateString  = '';

const getStrTemplateItem = function(name, link) {
  return `<li class="elements__item">
            <img src='./images/Trash.svg' alt='корзина' class='elements__trash'>
            <img src="${link}" alt="Карачаевск" class="elements__image">
            <div class="elements__card">
              <h2 class="elements__text">${name}</h2>
              <button type="button" class="elements__button"></button>
            </div>
          </li>`
};

initialCards.forEach(function(item) {
  const cardTemplate = getStrTemplateItem(item.name, item.link);
  allTemplateString = allTemplateString + cardTemplate;
});

elementsList.innerHTML = allTemplateString;



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
function popupOpened() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileContent.textContent;
  popupEdit.classList.add('popup_opened');
}

function popupCreateOpened() {
 popupCreate.classList.add('popup_opened');
}

profileButton.addEventListener('click', popupOpened);
createButton.addEventListener('click', popupCreateOpened);


// Закрытие попапа
function popupClosed() {
  this.closest('.popup').classList.remove('popup_opened');
}

popupCloseButtons.forEach(btn => {
  btn.addEventListener('click', popupClosed);
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
  const newStrTemplate = getStrTemplateItem(cityInputValue, linkInputValue);
  elementsList.innerHTML = elementsList.innerHTML + newStrTemplate;
  formCreateElement.closest('.popup').classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
formCreateElement.addEventListener('submit', formSubmitCreateHandler);

