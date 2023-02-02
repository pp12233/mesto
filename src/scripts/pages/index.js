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
const popupImg = document.querySelector(".popup_gallery");
const formEditProfile = popupEdit.querySelector(".popup__form");
const formCreateElement = popupCreate.querySelector(".popup__form");
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
const popups = document.querySelectorAll(".popup");
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
  elementsList
);
cardSection.renderItems();

const popupWithImage = new PopupWithImage(popupImg);
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

const userInfo = new UserInfo({
  selectorName: profileName,
  selectorInfo: profileContent,
});

const userPopupWithForm = new PopupWithForm(popupEdit, handleProfileFormSubmit);
userPopupWithForm.setEventListeners();
profileButton.addEventListener("click", () => {
  userPopupWithForm.open();
  const { name, info } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = info;
  validatorEditProfile.enableValidation();
});
function handleProfileFormSubmit() {
  const name = nameInput.value;
  const info = jobInput.value;
  userInfo.setUserInfo(name, info);
}

const addPopupWithForm = new PopupWithForm(popupCreate, handleCreateFormSubmit);
addPopupWithForm.setEventListeners();
createButton.addEventListener("click", () => {
  addPopupWithForm.open();
  validatorAddCard.enableValidation();
});
function handleCreateFormSubmit() {
  const item = {
    name: cityInput.value,
    link: linkInput.value,
  };
  elementsList.append(createCard(item));
  validatorAddCard.disableSubmitButton();
}

const validatorEditProfile = new FormValidator(
  validationConfig,
  popupEdit.querySelector(".popup__form")
);

const validatorAddCard = new FormValidator(
  validationConfig,
  popupCreate.querySelector(".popup__form")
);
