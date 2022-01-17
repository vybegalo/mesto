// Popup section

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close');
const overlay = document.querySelector('.overlay');
const overlayActiveClass = 'overlay_active';
let userName = document.querySelector('.profile__user-name');
let userInfo = document.querySelector('.profile__user-status');
let nameInput = document.querySelector('.popup__user_name');
let jobInput = document.querySelector('.popup__user_info');
let popup = document.querySelector('.popup__form');

function openPopup() {
    nameInput.value = userName.textContent;
    jobInput.value = userInfo.textContent;
    overlay.classList.add(overlayActiveClass);
};

function closePopup() {
    overlay.classList.remove(overlayActiveClass);
};

function formSubmitHandler(event) {
    event.preventDefault();
    userName.textContent = nameInput.value;
    userInfo.textContent = jobInput.value;
    closePopup();
};

buttonEditProfile.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);
popup.addEventListener('submit', formSubmitHandler);
