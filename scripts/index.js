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

// Находим форму в DOM
const popupEdit = document.querySelector('.popup_edit');
const popupCreate = document.querySelector('.popup_create');
const formElement = popupEdit.querySelector('.popup__form');
const formCreateElement = popupCreate.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');


const cityInput = formCreateElement.querySelector('.popup__input_type_city');
const linkInput = formCreateElement.querySelector('.popup__input_type_link');
const popupBtnCreate = formCreateElement.querySelector('.popup__btn_create');

const profileButton = document.querySelector('.profile__edit');
const createButton = document.querySelector('.profile__add');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileContent = document.querySelector('.profile__content');

const elementsList = document.querySelector('.elements__list');
const popapGallery = document.querySelector('.popup_gallery');
const templateItemContent = document.querySelector('#mesto').content;
const templateItem = templateItemContent.querySelector('.elements__item');

const popapImgGallery = popapGallery.querySelector('.popup__img');
const popupNameGallery = popapGallery.querySelector('.popup__name');

const popupEsc = document.querySelectorAll('.popup');

nameInput.value = profileName.textContent;
jobInput.value = profileContent.textContent;






initialCards.forEach(function(item) {
  const cloneCardItem = createCard(item);
  elementsList.append(cloneCardItem);
});

function createCard(item) {
  // тут создаете карточку и возвращаете ее
  const cardElement = templateItem.cloneNode(true);
  cardElement.querySelector('.elements__image').src = item.link;
  cardElement.querySelector('.elements__image').alt = item.name;
  cardElement.querySelector('.elements__text').textContent = item.name;
return cardElement
}


elementsList.addEventListener('click', function(evt) {
if(evt.target.classList.contains('elements__button')) {
  evt.target.classList.toggle('elements__button_activ')
}
if(evt.target.classList.contains('elements__trash')) {
  evt.target.closest('.elements__item').remove();
}
if(evt.target.classList.contains('elements__image')) {
  openPopup(popapGallery);
  popapImgGallery.src = evt.target.getAttribute('src');
  popapImgGallery.alt = evt.target.getAttribute('alt');

  const titleCard = evt.target.closest('.elements__item').querySelector('.elements__text');
  popupNameGallery.textContent = titleCard.textContent;
}
});


// открытие попапа
function openPopup(win) {
  win.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function openEditPopup() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileContent.textContent;
}

function openCreatePopup() {
  openPopup(popupCreate);
}

//закрытие по esc

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}


profileButton.addEventListener('click', openEditPopup);
createButton.addEventListener('click', openCreatePopup);


// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

// //закрытие по клику на фон и крестик

popupEsc.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup);
        }
    })
})


function handleProfileFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    const jobInputValue = jobInput.value;
    const nameInputValue = nameInput.value;

    profileName.textContent = nameInputValue;
    profileContent.textContent = jobInputValue;

    closePopup(formElement.closest('.popup'));
}

function handleCreateFormSubmit (evt) {
  evt.preventDefault();
  const cityInputValue = cityInput.value;
  const linkInputValue = linkInput.value;
  const item = {
    name: cityInputValue, link: linkInputValue
  }
  const cloneCardItem = createCard(item);
  elementsList.prepend(cloneCardItem);
  closePopup(formCreateElement.closest('.popup'));
  popupBtnCreate.setAttribute('disabled', true);
  popupBtnCreate.classList.add('popup__btn_type_disabled');
  evt.target.reset();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleProfileFormSubmit);
formCreateElement.addEventListener('submit', handleCreateFormSubmit);

