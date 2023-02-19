import "./index.css";
import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const popupEdit = document.querySelector(".popup_edit");
const popupCreate = document.querySelector(".popup_create");
const formAvatar = document.querySelector(".popup_avatar");
const formEditProfile = popupEdit.querySelector(".popup__form");
const formCreateElement = popupCreate.querySelector(".popup__form");
const formEditAvatar = formAvatar.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_job");
const profileButton = document.querySelector(".profile__edit");
const createButton = document.querySelector(".profile__add");
const elementsList = document.querySelector(".elements__list");
const profileImage = document.querySelector(".profile__image-edit");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn",
  inactiveButtonClass: "popup__btn_type_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "5fcd14e6-b00f-43b5-9684-55e27945ea26",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__content",
  avatar: ".profile__image",
});

api.getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data);
  })
  .catch((err) => console.log(err));


function createCard(data) {
  const card = new Card(data, "#mesto", userInfo.getUserId(), {
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    handleDeleteClick: (card) => {
      popupConfirmation.open(card);
    },
    handleClickLikes: () => {
      const id = card.getId();
      const like = card.checkLike();

      const result = like ? api.removingLike(id) : api.settingLike(id);
      result
        .then((data) => {
          card.setLike(data);
          card.liker();
        })
        .catch((err) => console.log(err));
    }
  });
  const cardGenerate = card.generateCard();
  cardSection.addItem(cardGenerate);
}

const cardSection = new Section({ renderer: createCard }, ".elements__list");
api.getInitialCards()
  .then((res) => {
    cardSection.renderItems(res);
  })
  .catch((err) => console.log(err));

const popupWithImage = new PopupWithImage(".popup_gallery");
popupWithImage.setEventListeners();

const popupConfirmation = new PopupWithConfirmation(
  ".popup_delete-card",
  deleteHandler
);
popupConfirmation.setEventListeners();

function deleteHandler(card) {
  const btnText = document.querySelector('.popup__btn_approval').textContent;
  document.querySelector('.popup__btn_approval').textContent = 'Удаление...';
  api.deletingCard(card.getAttribute('data-id'));
  popupConfirmation.close();
  card.remove();
  card = null;
  document.querySelector('.popup__btn_approval').textContent = btnText;
}


const userPopupWithForm = new PopupWithForm(".popup_edit", (obj) => {
  validatorEditProfile.disableSubmitButton();
  api.editingUser(obj)
  .then((data) => {userInfo.setUserInfo(data)})
  .catch((err) => {console.log(`Ошибка ${err}`)})
});
userPopupWithForm.setEventListeners();
profileButton.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  userPopupWithForm.open();
});

const addPopupWithForm = new PopupWithForm(".popup_create", (obj) => {
  validatorAddCard.disableSubmitButton();
  api.addingNewCard(obj)
    .then((data) => {
      elementsList.append(createCard(data));
    })
    .catch((err) => {console.log(`Ошибка ${err}`)});
});
addPopupWithForm.setEventListeners();
createButton.addEventListener("click", () => {
  addPopupWithForm.open();
});

const avatarPopupForm = new PopupWithForm(".popup_avatar", (obj) => {
  validatorAvatarCard.disableSubmitButton();
  api.updateAvatar(obj)
  .then((data) => {userInfo.setUserInfo(data)})
  .catch((err) => {console.log(`Ошибка ${err}`)})
})
avatarPopupForm.setEventListeners();
profileImage.addEventListener("click", () => {
  avatarPopupForm.open();
});

const validatorEditProfile = new FormValidator(validationConfig, formEditProfile);
validatorEditProfile.enableValidation();

const validatorAddCard = new FormValidator(validationConfig, formCreateElement);
validatorAddCard.enableValidation();

const validatorAvatarCard = new FormValidator(validationConfig, formEditAvatar);
validatorAvatarCard.enableValidation();
