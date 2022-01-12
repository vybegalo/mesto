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