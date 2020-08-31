

//функция для  проверки валидности на каждый ввод символа
// Функция, которая добавляет класс с ошибкой
function showInputError(formElement, inputElement, errorMessage) {
    const formError = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    formError.textContent = errorMessage;
    formError.classList.add('popup__error_visible');

  };
  
  // Функция, которая удаляет класс с ошибкой
  function hideInputError(formElement, inputElement) {
    const formError = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    formError.classList.remove('popup__error_visible');
    formError.textContent = '';
  };
  
  // Функция, которая проверяет валидность поля
  function isValid(formElement, inputElement) {      
    if (!inputElement.validity.valid) {
        
        // console.log(inputElement.id);
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      // Если проходит, скроем
      hideInputError(formElement, inputElement);
    }
  };


function setEventListener(formElement, {inputSelector, ...rest}) {
    
    //создаю массив з всех инпутов
    const inputList = Array.from(formElement.querySelectorAll(inputSelector)); 
//обхожу весь массив инпутов и вывожу в консоль значеня свойства validity, при вводе значений в инпутах
    inputList.forEach(function (inputElement) {
        inputElement.addEventListener('input', function () {
            isValid(formElement, inputElement);
          });    
    });
}

function enableValidation ({formSelector, ...rest}) {
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