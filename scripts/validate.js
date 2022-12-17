const formSelector = document.querySelector('.popup__form');
const inputSelector = formSelector.querySelector('.popup__input');

// Функция, которая добавляет класс с ошибкой
const showInputError = (formSelector, inputSelector, errorMessage) => {
  const errorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add('popup__input_type_error');
  errorClass.textContent = errorMessage;
  errorClass.classList.add('popup__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formSelector, inputSelector) => {
  const errorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove('popup__input_type_error');
  errorClass.classList.remove('popup__input-error_active');
  errorClass.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formSelector, inputSelector);
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

const toggleButtonState = (inputList, submitButtonSelector) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    submitButtonSelector.classList.add('popup__btn_type_disabled');
  } else {
    // иначе сделай кнопку активной
    submitButtonSelector.classList.remove('popup__btn_type_disabled');
  }
};


const setEventListeners = (formSelector) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formSelector.querySelectorAll('.popup__input'));
  const submitButtonSelector = formSelector.querySelector('.popup__btn');

  toggleButtonState(inputList, submitButtonSelector);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputSelector) => {
    // каждому полю добавим обработчик события input
    inputSelector.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formSelector, inputSelector);
      toggleButtonState(inputList, submitButtonSelector);
    });
  });
};

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formSelector) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formSelector);
  });
};

// Вызовем функцию
enableValidation();


// enableValidation({
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//   });


