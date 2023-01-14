import { initialCards } from "./constants.js";
import Card from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openPopup, closePopup } from "../utils/utils.js";

// Находим форму в DOM
const popupEdit = document.querySelector(".popup_edit");
const popupCreate = document.querySelector(".popup_create");
const formEditProfile = popupEdit.querySelector(".popup__form");
const formCreateElement = popupCreate.querySelector(".popup__form");
// Находим поля формы в DOM
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_job");

const cityInput = formCreateElement.querySelector(".popup__input_type_city");
const linkInput = formCreateElement.querySelector(".popup__input_type_link");
const popupBtnCreate = formCreateElement.querySelector(".popup__btn_create");

const profileButton = document.querySelector(".profile__edit");
const createButton = document.querySelector(".profile__add");
const profileName = document.querySelector(".profile__name");
const profileContent = document.querySelector(".profile__content");

const elementsList = document.querySelector(".elements__list");

const popupEsc = document.querySelectorAll(".popup");

initialCards.forEach(function (item) {
  elementsList.append(createCard(item));
});

function openEditPopup() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileContent.textContent;
}

function openCreatePopup() {
  openPopup(popupCreate);
}

profileButton.addEventListener("click", openEditPopup);
createButton.addEventListener("click", openCreatePopup);

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

  closePopup(popupEdit);
}

function handleCreateFormSubmit(evt) {
  evt.preventDefault();
  const cityInputValue = cityInput.value;
  const linkInputValue = linkInput.value;

  const item = { name: cityInputValue, link: linkInputValue };

  elementsList.prepend(createCard(item));
  closePopup(popupCreate);
  validatorAddCard.disableSubmitButton();
  evt.target.reset();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formCreateElement.addEventListener("submit", handleCreateFormSubmit);

const validatorEditProfile = new FormValidator(
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

const validatorAddCard = new FormValidator(
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

validatorEditProfile.enableValidation();

validatorAddCard.enableValidation();

function createCard(item) {
  const card = new Card(item.name, item.link, "#mesto");
  return card.generateCard();
}
