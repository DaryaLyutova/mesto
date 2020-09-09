//функция для  проверки валидности на каждый ввод символа
// Функция, которая добавляет класс с ошибкой
function showInputError(formElement, inputElement, inputErrorClass, errorClass, errorMessage) {
  const formError = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(errorClass);
};

// Функция, которая удаляет класс с ошибкой
function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const formError = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  formError.classList.remove(errorClass);
  formError.textContent = '';
};

// Функция, которая проверяет валидность поля
function isValid(formElement, inputElement, inputErrorClass, errorClass) {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage);

  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

//функция переключения класса активной/неактивной кнопки "Сохранить"
function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

//функция переключения класса активной/неактивной кнопки "Сохранить"
function toggleButtonState(inputList, formButton, inactiveButtonClass) {
  if (!hasInvalidInput(inputList)) {

    formButton.classList.remove(inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    formButton.classList.add(inactiveButtonClass);
  }
}

function setEventListener(formElement, { inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass, ...rest }) {

  //создаю массив з всех инпутов
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const formButton = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, formButton, inactiveButtonClass);

  //обхожу весь массив инпутов и вывожу в консоль значеня свойства validity, при вводе значений в инпутах
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, inputErrorClass, errorClass);

      toggleButtonState(inputList, formButton, inactiveButtonClass);
    });
  });
}

function enableValidation({ formSelector, ...rest }) {
  const getFormList = Array.from(document.querySelectorAll(formSelector));

  getFormList.forEach(function (formElement) {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    //вызов функции для  проверки валидности на каждый ввод символа
    setEventListener(formElement, rest);
  });
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
