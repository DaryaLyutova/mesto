const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.edit-button');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupSaveButton = popup.querySelector('.popup__save-button');
let InfoContainer = document.querySelector('.profile-info');
let saveButton = popup.querySelector('.popup__save-button');
let name = document.querySelector('.profile-info__name');
let aboutYou = document.querySelector('.profile-info__activity');
let inputName = popup.querySelector('.popup__input-name');
let inputAboutYou = popup.querySelector('.popup__input-activity');

inputName.value = name.textContent;
inputAboutYou.value = aboutYou.textContent;

const popupToggle = function () {
   popup.classList.toggle('popup_opened');
}

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    
     name.textContent = inputName.value;
     aboutYou.textContent = inputAboutYou.value;
}

popup.addEventListener('submit', formSubmitHandler);

saveButton.addEventListener('click', popupToggle);
