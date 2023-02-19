import "./index.css";
import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import {
  formEditProfile,
  formCreateElement,
  formEditAvatar,
  nameInput,
  jobInput,
  profileButton,
  createButton,
  profileImage,
  btnTextDelet,
  validationConfig
} from "../utils/constants.js";


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
          card.turnLikes(data);
          card.setLikes();
        })
        .catch((err) => console.log(err));
    },
  });
  cardSection.appendItem(card.generateCard());
}

const cardSection = new Section({ renderer: createCard }, ".elements__list");


Promise.all([api.getUserInfo(), api.getCards()])
// тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
  .then(([userData, cards]) => {
      // тут установка данных пользователя
      userInfo.setUserInfo(userData);
      // и тут отрисовка карточек
      cardSection.renderItems(cards);
  })
  .catch(err => {console.log(err)});


const popupWithImage = new PopupWithImage(".popup_gallery");
popupWithImage.setEventListeners();

const popupConfirmation = new PopupWithConfirmation(
  ".popup_delete-card",
  deleteHandler
);
popupConfirmation.setEventListeners();

function deleteHandler(card) {
  const btnText = btnTextDelet.textContent;
  btnTextDelet.textContent = "Удаление...";
  api.deletingCard(card.getAttribute("data-id"))
  .then(() => {popupConfirmation.close();
  card.remove();
  card = null})
  .catch(err => console.log(err))
  .finally(() => {btnTextDelet.textContent = btnText})}

const userPopupWithForm = new PopupWithForm(".popup_edit", async (obj) => {
  try {
    const data = await api.editingUser(obj)
    userInfo.setUserInfo(data)
    } catch (err) {console.log(`Ошибка ${err}`)}
});
userPopupWithForm.setEventListeners();
profileButton.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  userPopupWithForm.open();
  validatorEditProfile.disableSubmitButton();
});

const addPopupWithForm = new PopupWithForm(".popup_create", async (obj) => {
  try {
    const data = await api.addingNewCard(obj)
    cardSection.prependItem(createCard(data))
  } catch (err) {console.log(`Ошибка ${err}`)}
});
addPopupWithForm.setEventListeners();
createButton.addEventListener("click", () => {
  addPopupWithForm.open();
  validatorAddCard.disableSubmitButton();
});

const avatarPopupForm = new PopupWithForm(".popup_avatar", async (obj) => {
  try {
    const data = await api.updateAvatar(obj)
    userInfo.setUserInfo(data)
  } catch (err) {console.log(`Ошибка ${err}`)}
});
avatarPopupForm.setEventListeners();
profileImage.addEventListener("click", () => {
  avatarPopupForm.open();
  validatorAvatarCard.disableSubmitButton();
});

const validatorEditProfile = new FormValidator(
  validationConfig,
  formEditProfile
);
validatorEditProfile.enableValidation();

const validatorAddCard = new FormValidator(validationConfig, formCreateElement);
validatorAddCard.enableValidation();

const validatorAvatarCard = new FormValidator(validationConfig, formEditAvatar);
validatorAvatarCard.enableValidation();
