// функция смены класса кнопки лайк

/*
const likeListBtn = document.querySelectorAll('.elements__button');
likeListBtn.forEach(function(item) {
  item.addEventListener('click', function() {item.classList.toggle('elements__button_activ')})
});
*/


// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');

const profileButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileContent = document.querySelector('.profile__content');


// открытие попапа
function popupOpened() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileContent.textContent;
  popup.classList.add('popup_opened');
}

profileButton.addEventListener('click', popupOpened);

// Закрытие попапа
function popupClosed() {
  popup.classList.remove('popup_opened');
}

popupCloseButton.addEventListener('click', popupClosed);


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

    popupClosed();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

