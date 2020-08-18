const popup = document.querySelector('.popup');
const popupAddCard = document.querySelector('.popup__add-card');
const popupOpenButton = document.querySelector('.edit-button');
const popupAddCardOpenButton = document.querySelector('.profile__add-button');
const popupAddCardCloseButton = document.querySelector('.popup__close-button_card');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupSaveButton = popup.querySelector('.popup__save-button');
const infoContainer = document.querySelector('.profile-info');
let name = document.querySelector('.profile-info__name');
let aboutYou = document.querySelector('.profile-info__activity');
let inputName = popup.querySelector('.popup__form_input-name');
let inputAboutYou = popup.querySelector('.popup__form_input-activity');
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
function addCard(nameElement, linkElement) {
    const cardTemplate = document.querySelector('.place').content;
    const cardElement = cardTemplate.cloneNode(true);
      
    cardElement.querySelector('.place__image').src = linkElement;
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
    const popupPhoto = document.querySelector('.popup__photo')
    cardElement.querySelector('.place__image').addEventListener('click', function (event) {
        popupPhoto.classList.toggle('popup_opened');
        popupPhoto.querySelector('.popup__title-photo').textContent = nameElement;
        console.log(nameElement);
        popupPhoto.querySelector('.popup__image').src = linkElement;
        console.log(linkElement);
    });

    popupCloseButtonPhoto = popupPhoto.querySelector('.popup__close-button_photo');
    const popupClosePhoto = function () {
        popupPhoto.classList.remove('popup_opened');
    }
    popupCloseButtonPhoto.addEventListener('click', popupClosePhoto);

     cardsContainer.prepend(cardElement);
}

initialCards.forEach(function (item) {
    const nameElement = item.name;
    const linkElement = item.link;   
    addCard(nameElement, linkElement);
});

//Добавление карточки
popupAddCard.addEventListener('submit', evt => {
    evt.preventDefault();
    nameElement = popupAddCard.querySelector('.popup__form_input-placename').value;
    linkElement = popupAddCard.querySelector('.popup__form_input-link').value;
    
    addCard(nameElement, linkElement);
    popupAddCard.reset();
});

//логика работы попапа добавления карточки места
//открытие закрытие попапа
const popupAddCardToggle = function () {
    popupAddCard.classList.toggle('popup_opened');
 }

popupAddCardOpenButton.addEventListener('click', popupAddCardToggle);
popupAddCardCloseButton.addEventListener('click', popupAddCardToggle);

const popupAddCardClose = function () {
    popupAddCard.classList.remove('popup_opened');
 }
popupCardSaveButton.addEventListener('click', popupAddCardClose);


//логика работы попапа с инфомацией о пользователе
//открытие закрытие попапа
const popupToggle = function () {
    popup.classList.toggle('popup_opened');
    inputName.value = name.textContent;
    inputAboutYou.value = aboutYou.textContent;
 }
 
 popupOpenButton.addEventListener('click', popupToggle);
 popupCloseButton.addEventListener('click', popupToggle);
 
 //внесение изменений данных пользователя из попапа 
 function formSubmitHandler (evt) {
     evt.preventDefault(); 
     
      name.textContent = inputName.value;
      aboutYou.textContent = inputAboutYou.value;
 }
 
 popup.addEventListener('submit', formSubmitHandler);
 
 const popupClose = function () {
    popup.classList.remove('popup_opened');
 }
 popupSaveButton.addEventListener('click', popupClose);
 // попап завершен

