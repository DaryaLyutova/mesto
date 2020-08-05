let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.edit-button');
let popupCloseButton = popup.querySelector('.popup__close-button');
let popupSaveButton = popup.querySelector('.popup__save-button');
let infoContainer = document.querySelector('.profile-info');
let saveButton = popup.querySelector('.popup__save-button');
let name = document.querySelector('.profile-info__name');
let aboutYou = document.querySelector('.profile-info__activity');
let inputName = popup.querySelector('.popup__form_input-name');
let inputAboutYou = popup.querySelector('.popup__form_input-activity');

let popupToggle = function () {
   popup.classList.toggle('popup_opened');
   inputName.value = name.textContent;
   inputAboutYou.value = aboutYou.textContent;
}

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    
     name.textContent = inputName.value;
     aboutYou.textContent = inputAboutYou.value;
}

popup.addEventListener('submit', formSubmitHandler);

let popupClose = function () {
   popup.classList.remove('popup_opened');
}
popupSaveButton.addEventListener('click', popupClose);
