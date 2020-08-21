const popup = document.querySelector('.popup');
const popupAddCard = document.querySelector('.popup_add-card');
const popupOpenButton = document.querySelector('.edit-button');
const popupAddCardOpenButton = document.querySelector('.profile__add-button');
const popupAddCardCloseButton = document.querySelector('.popup__close-button_card');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupSaveButton = popup.querySelector('.popup__save-button');
const name = document.querySelector('.profile-info__name');
const aboutYou = document.querySelector('.profile-info__activity');
const inputName = popup.querySelector('.popup__form_input-name');
const inputAboutYou = popup.querySelector('.popup__form_input-activity');
const popupCardSaveButton = document.querySelector('.popup__save-button_card');

//каточки на станице
const initialCards = [
   {
       name: 'Архыз',
       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
   },
   {
       name: 'Челябинская область',
       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
   },
   {
       name: 'Иваново',
       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
   },
   {
       name: 'Камчатка',
       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
   },
   {
       name: 'Холмогорский район',
       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
   },
   {
       name: 'Байкал',
       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
   }
];

const cardsContainer = document.querySelector('.places');

//функция добавленя элементов массива в DOM   
function createCard(nameElement, linkElement) {
    const cardTemplate = document.querySelector('.place').content;
    const cardElement = cardTemplate.cloneNode(true);
    const placeImage = cardElement.querySelector('.place__image');
      
    placeImage.src = linkElement;
    cardElement.querySelector('.place__title').textContent = nameElement;

    //Лайк карточки
    cardElement.querySelector('.place__like').addEventListener('click', function (event) {
        event.target.classList.toggle('place__like_active');
    });
  
    //Удаление карточки 
    cardElement.querySelector('.place__delete').addEventListener('click', function(event) {
        event.target.parentElement.remove();        
    });

    //  попап с фотографией
    const popupPhoto = document.querySelector('.popup_photo');
    
    function openPopupPhoto() {
        popupPhoto.classList.toggle('popup_opened');
        popupPhoto.querySelector('.popup__title-photo').textContent = nameElement;
        popupPhoto.querySelector('.popup__image').src = linkElement;
    }

    placeImage.addEventListener('click', openPopupPhoto);

    popupCloseButtonPhoto = popupPhoto.querySelector('.popup__close-button_photo');
    const popupClosePhoto = function () {
        popupPhoto.classList.remove('popup_opened');
    }
    popupCloseButtonPhoto.addEventListener('click', popupClosePhoto);
    return cardElement;    
}

function addCard(nameElement, linkElement){
    cardsContainer.prepend(createCard(nameElement, linkElement));
}

initialCards.forEach(function (item) {
    const nameElement = item.name;
    const linkElement = item.link;   
    addCard(nameElement, linkElement);
});

//Добавление карточки
popupAddCard.addEventListener('submit', evt => {
    evt.preventDefault();
    const nameElement = popupAddCard.querySelector('.popup__form_input-placename').value;
    const linkElement = popupAddCard.querySelector('.popup__form_input-link').value;
    
    addCard(nameElement, linkElement);
    popupAddCard.reset();
});

//логика работы попапа с инфомацией о пользователе
//открытие закрытие попапа
function popupToggle (popupElement) {
    popupElement.classList.toggle('popup_opened');
    inputName.value = name.textContent;
    inputAboutYou.value = aboutYou.textContent;
}

function popupClose (popupElement) {
    popupElement.classList.remove('popup_opened');
}

popupOpenButton.addEventListener('click', function() {
    popupToggle (popup);
});
popupCloseButton.addEventListener('click', function() {
    popupClose (popup);
});
popupAddCardOpenButton.addEventListener('click',  function() {
    popupToggle (popupAddCard);
});
popupAddCardCloseButton.addEventListener('click', function() {
    popupClose (popupAddCard);
});

//внесение изменений данных пользователя из попапа 
function formSubmitHandler (evt) {
    evt.preventDefault(); 
     
    name.textContent = inputName.value;
    aboutYou.textContent = inputAboutYou.value;
}
 
popup.addEventListener('submit', formSubmitHandler);

popupSaveButton.addEventListener('click', function() {
    popupClose (popup);
});
popupCardSaveButton.addEventListener('click', function() {
    popupClose (popupAddCard);
});
// попап завершен

