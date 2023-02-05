import "./index.css";
import { initialCards } from "../utils/constants.js";
import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const popupEdit = document.querySelector(".popup_edit");
const popupCreate = document.querySelector(".popup_create");
const formEditProfile = popupEdit.querySelector(".popup__form");
const formCreateElement = popupCreate.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_job");
const cityInput = formCreateElement.querySelector(".popup__input_type_city");
const linkInput = formCreateElement.querySelector(".popup__input_type_link");
const profileButton = document.querySelector(".profile__edit");
const createButton = document.querySelector(".profile__add");
const elementsList = document.querySelector(".elements__list");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn",
  inactiveButtonClass: "popup__btn_type_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

function createCard(item) {
  const card = new Card(item.name, item.link, "#mesto", handleCardClick);
  const cardGenerate = card.generateCard();
  cardSection.addItem(cardGenerate);
}

const cardSection = new Section(
  { items: initialCards, renderer: createCard },
  ".elements__list"
);
cardSection.renderItems();

const popupWithImage = new PopupWithImage(".popup_gallery");
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

const userInfo = new UserInfo({
  name: ".profile__name",
  info: ".profile__content",
});

const userPopupWithForm = new PopupWithForm(".popup_edit", (obj) => {
  userInfo.setUserInfo(obj.name, obj.job)});
userPopupWithForm.setEventListeners();
profileButton.addEventListener("click", () => {
  const { name, info } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = info;
  userPopupWithForm.open();
});


const addPopupWithForm = new PopupWithForm(".popup_create", (obj) => {
  elementsList.append(createCard({
    name: obj.city,
    link: obj.link
  }));
  validatorAddCard.disableSubmitButton();
});
addPopupWithForm.setEventListeners();
createButton.addEventListener("click", () => {
  addPopupWithForm.open();
});

const validatorEditProfile = new FormValidator(
  validationConfig,
  formEditProfile
);
validatorEditProfile.enableValidation();

const validatorAddCard = new FormValidator(
  validationConfig,
  formCreateElement
);
validatorAddCard.enableValidation();
