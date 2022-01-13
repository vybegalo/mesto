// Popup section

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

document.addEventListener('keydown', function (event) {
    if (event.code === 'Escape') {
        overlay.classList.remove(overlayActiveClass);
    }
});

let userName = document.querySelector('.profile__user-name');
let userInfo = document.querySelector('.profile__user-status');
let nameInput = document.querySelector('.popup__user-name');
let jobInput = document.querySelector('.popup__about-user');
let popup = document.querySelector('.popup__form');

nameInput.value = userName.textContent;
jobInput.value = userInfo.textContent;

function formSubmitHandler(event) {
    event.preventDefault();
    userName.textContent = nameInput.value;
    userInfo.textContent = jobInput.value;
    overlay.classList.remove(overlayActiveClass);
};

popup.addEventListener('submit', formSubmitHandler);

// Like button section

const likeButtonList = document.querySelectorAll('.element__like');
const likeButtonActive = 'element__like_active';

for (let i = 0; i < likeButtonList.length; i++) {
    let likeButton = likeButtonList[i];
    likeButton.addEventListener('click', function () {
        likeButton.classList.toggle(likeButtonActive);
    });
};
