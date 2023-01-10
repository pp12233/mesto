export class FormValidator {
  constructor(selectors, formElement) {
    this._formElement = formElement;
    this._selectors = selectors;
  }

  _toggleButtonState(inputList, submitButtonSelector, settings) {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      submitButtonSelector.classList.add(settings.inactiveButtonClass);
      submitButtonSelector.setAttribute("disabled", true);
    } else {
      // иначе сделай кнопку активной
      submitButtonSelector.classList.remove(settings.inactiveButtonClass);
      submitButtonSelector.removeAttribute("disabled");
    }
  }

  // Функция, которая добавляет класс с ошибкой
  _showInputError(formSelector, inputSelector, errorMessage, settings) {
    const errorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add(settings.inputErrorClass);
    errorClass.textContent = errorMessage;
    errorClass.classList.add(settings.errorClass);
  }

  // Функция, которая удаляет класс с ошибкой
  _hideInputError(formSelector, inputSelector, settings) {
    const errorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(settings.inputErrorClass);
    errorClass.classList.remove(settings.errorClass);
    errorClass.textContent = "";
  }

  _isValid(formSelector, inputSelector, settings) {
    if (!inputSelector.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(
        formSelector,
        inputSelector,
        inputSelector.validationMessage,
        settings
      );
    } else {
      // Если проходит, скроем
      this._hideInputError(formSelector, inputSelector, settings);
    }
  }

  _hasInvalidInput(inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputSelector) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true

      return !inputSelector.validity.valid;
    });
  }

  _setEventListeners(formSelector, settings) {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(
      formSelector.querySelectorAll(settings.inputSelector)
    );
    const submitButtonSelector = formSelector.querySelector(
      settings.submitButtonSelector
    );

    this._toggleButtonState(inputList, submitButtonSelector, settings);

    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputSelector) => {
      // каждому полю добавим обработчик события input
      inputSelector.addEventListener("input", () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(formSelector, inputSelector, settings);
        this._toggleButtonState(inputList, submitButtonSelector, settings);
      });
    });
  }

  enableValidation() {
    this._setEventListeners(this._formElement, this._selectors);
  }
}
