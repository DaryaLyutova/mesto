

//функция для  проверки валидности на каждый ввод символа
// Функция, которая добавляет класс с ошибкой
function showInputError(element) {
    element.classList.add('popup__input_type_error');
  };
  
  // Функция, которая удаляет класс с ошибкой
  function hideInputError(element) {
    element.classList.remove('popup__input_type_error');
  };
  
  // Функция, которая проверяет валидность поля
  function isValid(inputElement) {      
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(inputElement);
    } else {
      // Если проходит, скроем
      hideInputError(inputElement);
    }
  };


function setEventListener(formElement, {inputSelector, ...rest}) {
    //создаю массив з всех инпутов
    
    const inputList = Array.from(document.querySelectorAll(inputSelector)); 
//обхожу весь массив инпутов и вывожу в консоль значеня свойства validity, при вводе значений в инпутах
    inputList.forEach(function (inputElement) {
        inputElement.addEventListener('input', function () {
            isValid(inputElement);
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