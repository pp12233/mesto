const likeListBtn = document.querySelectorAll('.elements__button');
likeListBtn.forEach(function(item) {
  item.addEventListener('click', function() {item.classList.toggle('elements__button_activ')})
});

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('#input-name');
let jobInput = formElement.querySelector('#input-job');

nameInput.value = document.querySelector('.profile-info__name').textContent;
jobInput.value = document.querySelector('.profile-info__content').textContent;

const profileButton = document.querySelector('.profile-info__edit-button');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');

profileButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
})

popupClose.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
})

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    const jobInputValue = jobInput.value
    const nameInputValue = nameInput.value

    // Выберите элементы, куда должны быть вставлены значения полей
    const profileName = document.querySelector('.profile-info__name');
    const profileContent = document.querySelector('.profile-info__content');
    // Вставьте новые значения с помощью textContent

    profileName.textContent = nameInputValue;
    profileContent.textContent = jobInputValue;

    popup.classList.remove('popup_opened');

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

