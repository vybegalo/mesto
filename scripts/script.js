import { Card } from "./card.js";

const popupActiveClass = 'popup_active';
const profileAddButton = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const userName = document.querySelector('.profile__user-name');
const userInfo = document.querySelector('.profile__user-status');
const nameInput = document.querySelector('.popup__user_type_name');
const jobInput = document.querySelector('.popup__user_type_description');
const popupForm = document.querySelector('.popup__form');
const buttonCloseAdd = document.querySelector('.popup__close-add');
const popupAddPlace = document.querySelector('.popup_type_add-place');
const popupAddPlaceForm = popupAddPlace.querySelector('.popup__form');
const placeNameInput = document.querySelector('.popup__user_type_place-name');
const placeLinkInput = document.querySelector('.popup__user_type_place-link');
const elementsContainer = document.querySelector('.elements');
const elementSelector = '#elementTemplate';

// keydown / click handlers

const closeOnEsc = (evt) => {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector("." + popupActiveClass);
        closePopup(popupOpened);
    }
};

const closeOnSideClick = (evt) => {
    if (evt.target === evt.currentTarget) {
        const popupOpened = document.querySelector("." + popupActiveClass);
        closePopup(popupOpened);
    }
};

// Popup open/close section

export function openPopup(popup) {
    popup.classList.add(popupActiveClass);
    popup.addEventListener('mousedown', closeOnSideClick);
    document.addEventListener('keydown', closeOnEsc);
}

export function closePopup(popup) {
    popup.classList.remove(popupActiveClass);
    const elementForm = popup.querySelector('.popup__form');
    if (elementForm) {
        toggleSubmit(elementForm, formsValidationConfig)
    }

    popup.removeEventListener('mousedown', closeOnSideClick);
    document.removeEventListener('keydown', closeOnEsc);
};

// Profile manage section

buttonEditProfile.addEventListener('click', () => {
    nameInput.value = userName.textContent;
    jobInput.value = userInfo.textContent;
    openPopup(popupEditProfile);
});

buttonClose.addEventListener('click', () => {
    closePopup(popupEditProfile);
});

popupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    userName.textContent = nameInput.value;
    userInfo.textContent = jobInput.value;
    closePopup(popupEditProfile);
});

// Popup section button "add"

profileAddButton.addEventListener('click', () => {
    openPopup(popupAddPlace);
});

buttonCloseAdd.addEventListener('click', () => {
    closePopup(popupAddPlace);
});


// Elements (cards) section

function renderElement(elementsContainer, element, toBeggining = false) {
    toBeggining ? elementsContainer.prepend(element) : elementsContainer.append(element);
}

// add photo by user

function elementPopupSubmit(event) {
    event.preventDefault();

    const elementData = {
        name: placeNameInput.value,
        link: placeLinkInput.value,
        alt: placeNameInput.value
    }

    const newElement = new Card(elementData, elementSelector);
    renderElement(elementsContainer, newElement.generateElement(), true);
    closePopup(popupAddPlace);
}

popupAddPlace.addEventListener('submit', elementPopupSubmit)


initialCards.forEach(item => {
    const newElement = new Card(item, elementSelector);
    renderElement(elementsContainer, newElement.generateElement());
})

