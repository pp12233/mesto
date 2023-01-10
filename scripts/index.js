import Card from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Находим форму в DOM
const popupEdit = document.querySelector(".popup_edit");
const popupCreate = document.querySelector(".popup_create");
const formElement = popupEdit.querySelector(".popup__form");
const formCreateElement = popupCreate.querySelector(".popup__form");
// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_job");

const cityInput = formCreateElement.querySelector(".popup__input_type_city");
const linkInput = formCreateElement.querySelector(".popup__input_type_link");
const popupBtnCreate = formCreateElement.querySelector(".popup__btn_create");

const profileButton = document.querySelector(".profile__edit");
const createButton = document.querySelector(".profile__add");
const profileName = document.querySelector(".profile__name");
const profileContent = document.querySelector(".profile__content");

const elementsList = document.querySelector(".elements__list");


const popupEsc = document.querySelectorAll(".popup");

nameInput.value = profileName.textContent;
jobInput.value = profileContent.textContent;

initialCards.forEach(function (item) {
  const card = new Card(item.name, item.link, "#mesto");
  elementsList.append(card.generateCard());
});


// открытие попапа
export function openPopup(win) {
  win.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
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
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

profileButton.addEventListener("click", openEditPopup);
createButton.addEventListener("click", openCreatePopup);

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

// //закрытие по клику на фон и крестик

popupEsc.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  const jobInputValue = jobInput.value;
  const nameInputValue = nameInput.value;

  profileName.textContent = nameInputValue;
  profileContent.textContent = jobInputValue;

  closePopup(formElement.closest(".popup"));
}

function handleCreateFormSubmit(evt) {
  evt.preventDefault();
  const cityInputValue = cityInput.value;
  const linkInputValue = linkInput.value;

  const card = new Card(cityInputValue, linkInputValue, "#mesto");
  elementsList.prepend(card.generateCard());
  closePopup(formCreateElement.closest(".popup"));
  popupBtnCreate.setAttribute("disabled", true);
  popupBtnCreate.classList.add("popup__btn_type_disabled");
  evt.target.reset();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleProfileFormSubmit);
formCreateElement.addEventListener("submit", handleCreateFormSubmit);

const formProfile = new FormValidator(
  {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__btn",
    inactiveButtonClass: "popup__btn_type_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
  },
  popupEdit.querySelector(".popup__form")
);

const formCreate = new FormValidator(
  {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__btn",
    inactiveButtonClass: "popup__btn_type_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
  },
  popupCreate.querySelector(".popup__form")
);

formProfile.enableValidation();

formCreate.enableValidation();
