export const selectorObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export class FormValidator {
  constructor(selectorObj, formElement) {
    this._formSelector = selectorObj.formSelector;
    this._inputSelector = selectorObj.inputSelector;
    this._submitButtonSelector = selectorObj.submitButtonSelector;
    this._inactiveButtonClass = selectorObj.inactiveButtonClass;
    this._inputErrorClass = selectorObj.inputErrorClass;
    this._errorClass = selectorObj.errorClass;
    this._formElement = formElement;
  }

  //метод для  проверки валидности на каждый ввод символа
  // метод который добавляет класс с ошибкой
  _showInputError(inputElement) {
    const _formError = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    _formError.textContent = inputElement.validationMessage;
    _formError.classList.add(this._errorClass);
  }

  // Функция, которая удаляет класс с ошибкой
  _hideInputError(inputElement) {
    const _formError = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    _formError.classList.remove(this._errorClass);
    _formError.textContent = '';
  }

  //   // Функция, которая проверяет валидность поля
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(inputElement);
    } else {
      // Если проходит, скроем
      this._hideInputError(inputElement);
    }
  }

  //функция переключения класса активной/неактивной кнопки "Сохранить"
  _hasInvalidInput(_inputList) {
    return _inputList.some(function (inputElement) {
      return !inputElement.validity.valid;
    });
  }

  //функция переключения класса активной/неактивной кнопки "Сохранить"
  _toggleButtonState(_inputList) {
    const _formButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    if (!this._hasInvalidInput(_inputList)) {
      _formButton.classList.remove(this._inactiveButtonClass);
    } else {
      // иначе сделай кнопку активной
      _formButton.classList.add(this._inactiveButtonClass);
    }
  }

  _setEventListener() {
    //создаю массив з всех инпутов
    const _inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    //   const formButton = formElement.querySelector(submitButtonSelector);

    this._toggleButtonState(_inputList);

    //обхожу весь массив инпутов и вывожу в консоль значеня свойства validity, при вводе значений в инпутах
    _inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);

        this._toggleButtonState(_inputList);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListener();
  }
}

export const getFormList = Array.from(
  document.querySelectorAll(selectorObj.formSelector)
);
