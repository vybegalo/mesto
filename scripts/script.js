// Popup section

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const popupActiveClass = 'popup_active';
let userName = document.querySelector('.profile__user-name');
let userInfo = document.querySelector('.profile__user-status');
let nameInput = document.querySelector('.popup__user_type_name');
let jobInput = document.querySelector('.popup__user_type_description');
let popupForm = document.querySelector('.popup__form');

function openPopup() {
    nameInput.value = userName.textContent;
    jobInput.value = userInfo.textContent;
    popup.classList.add(popupActiveClass);
};

function closePopup() {
    popup.classList.remove(popupActiveClass);
};

function formSubmitHandler(event) {
    event.preventDefault();
    userName.textContent = nameInput.value;
    userInfo.textContent = jobInput.value;
    closePopup();
};

buttonEditProfile.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);
