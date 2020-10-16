export default class FormValidator {
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
  _hasInvalidInput() {
    return this._inputList.some(function (inputElement) {
      return !inputElement.validity.valid;
    });
  }

  //функция переключения класса активной/неактивной кнопки "Сохранить"
  _toggleButtonState() {
    const _formButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    if (!this._hasInvalidInput()) {
      _formButton.classList.remove(this._inactiveButtonClass);
      _formButton.removeAttribute('disabled');
    } else {
      // иначе сделай кнопку активной
      _formButton.classList.add(this._inactiveButtonClass);
      _formButton.setAttribute('disabled', true);
    }
  }

  _setEventListener() {
    //создаю массив з всех инпутов
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    this._toggleButtonState();

    //обхожу весь массив инпутов и вывожу в консоль значеня свойства validity, при вводе значений в инпутах
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);

        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListener();
  }

  resetForm() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      this._toggleButtonState();
    });
    this._formElement.reset();
  }
}
