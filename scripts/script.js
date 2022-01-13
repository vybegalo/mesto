const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close');
const overlay = document.querySelector('.overlay');
const overlayActiveClass = 'overlay_active';

buttonEditProfile.addEventListener('click', function () {
    overlay.classList.add(overlayActiveClass);
});

buttonClose.addEventListener('click', function () {
    overlay.classList.remove(overlayActiveClass);
});

overlay.addEventListener('click', function () {
    overlay.classList.remove(overlayActiveClass);
});

document.addEventListener('keydown', function (event) {
    if (event.code === 'Escape') {
        overlay.classList.remove(overlayActiveClass);
    }
});


let popup = document.querySelector('.popup');
let nameInput = document.querySelector('.profile__user-name');
let jobInput = document.querySelector('.profile__user-status');
let buttonSave = document.querySelector('.popup__save');

function formSubmitHandler(event) {
    event.preventDefault();
    nameInput.value = profileUserName.textContent;
    jobInput.value = profileUserStatus.textContent;
};

function formSubmitHandler(event) {
    event.preventDefault();
    profileUserName.textContent = nameInput.value;
    profileUserStatus.textContent = jobInput.value;
    closePopup()
};


popup.addEventListener('submit', formSubmitHandler);