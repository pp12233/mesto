const formSelector = document.querySelector('.popup__form');
const inputSelector = formSelector.querySelector('.popup__input');
const submitButtonSelector = document.querySelector('.popup__btn');

// Функция, которая добавляет класс с ошибкой
const showInputError = (formSelector, inputSelector, errorMessage, settings) => {
  const errorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(settings.inputErrorClass);
  errorClass.textContent = errorMessage;
  errorClass.classList.add(settings.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formSelector, inputSelector, settings) => {
  const errorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(settings.inputErrorClass);
  errorClass.classList.remove(settings.errorClass);
  errorClass.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formSelector, inputSelector, settings) => {
  if (!inputSelector.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formSelector, inputSelector, inputSelector.validationMessage, settings);
  } else {
    // Если проходит, скроем
    hideInputError(formSelector, inputSelector, settings);
  }
};

// Вызовем функцию isValid на каждый ввод символа

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputSelector) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputSelector.validity.valid;
  })
};

const toggleButtonState = (inputList, submitButtonSelector, settings) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    submitButtonSelector.classList.add(settings.inactiveButtonClass);
    submitButtonSelector.setAttribute('disabled', true);
  } else {
    // иначе сделай кнопку активной
    submitButtonSelector.classList.remove(settings.inactiveButtonClass);
    submitButtonSelector.removeAttribute('disabled');
  }
};


const setEventListeners = (formSelector, settings) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formSelector.querySelectorAll(settings.inputSelector));
  const submitButtonSelector = formSelector.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, submitButtonSelector, settings);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputSelector) => {
    // каждому полю добавим обработчик события input
    inputSelector.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formSelector, inputSelector, settings);
      toggleButtonState(inputList, submitButtonSelector, settings);
    });
  });
};

const enableValidation = (settings) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formSelector) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formSelector, settings);
  });
};

// Вызовем функцию

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});

