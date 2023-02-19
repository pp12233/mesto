export const formEditProfile = document.forms.profile;
export const formCreateElement = document.forms.create;
export const formEditAvatar = document.forms.avatar;
export const nameInput = formEditProfile.querySelector(
  ".popup__input_type_name"
);
export const jobInput = formEditProfile.querySelector(".popup__input_type_job");
export const profileButton = document.querySelector(".profile__edit");
export const createButton = document.querySelector(".profile__add");
export const profileImage = document.querySelector(".profile__image-edit");
export const btnTextDelet = document.querySelector(".popup__btn_approval");
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn",
  inactiveButtonClass: "popup__btn_type_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};
