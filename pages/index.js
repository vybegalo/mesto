import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { initialCards } from "../scripts/utils/icards.js";

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
const placeNameInput = document.querySelector('.popup__user_type_place-name');
const placeLinkInput = document.querySelector('.popup__user_type_place-link');
const popupImage = document.querySelector('.popup_image');
const popupImageCloseButton = popupImage.querySelector('.popup__close-image');
const elementsContainer = document.querySelector('.elements');
const elementSelector = '#elementTemplate';
const formsValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__user',
    inputErrorClass: 'popup__user_type_error',
    spanErrorClass: 'popup__input-error_active',
    submitButtonSelector: '.popup__save',
    submitButtonDisabled: 'popup__save_disabled'
};
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const popupAddPlaceForm = popupAddPlace.querySelector('.popup__form');

// Card class instance

const createCardInstance = (item, elementSelector) => {
    const newElement = new Card(item, elementSelector);
    return newElement;
};

// FormValidator class instance

const createValidatorInstance = (config, form) => {
    const formValidationInstance = new FormValidator(config, form);
    return formValidationInstance;
};

// Enable forms validation

const profileFormValidation = createValidatorInstance(formsValidationConfig, popupEditProfileForm);
profileFormValidation.enableValidation();

const addPlaceValidation = createValidatorInstance(formsValidationConfig, popupAddPlaceForm);
addPlaceValidation.enableValidation();

// keydown / click handlers

const closeOnEsc = (evt) => {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector("." + popupActiveClass);
        closePopup(popupOpened);
    }
};

const closeOnSideClick = (evt) => {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
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
    popup.removeEventListener('mousedown', closeOnSideClick);
    document.removeEventListener('keydown', closeOnEsc);
};

// Profile manage section

buttonEditProfile.addEventListener('click', () => {
    nameInput.value = userName.textContent;
    jobInput.value = userInfo.textContent;
    openPopup(popupEditProfile);
    profileFormValidation.toggleSubmit();
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
    addPlaceValidation.toggleSubmit();
});

buttonCloseAdd.addEventListener('click', () => {
    closePopup(popupAddPlace);
});

// Image close button

popupImageCloseButton.addEventListener('click', () => {
    closePopup(popupImage);
});

// Elements (cards) section

function renderElement(elementsContainer, element, toBeggining = false) {
    toBeggining ? elementsContainer.prepend(element) : elementsContainer.append(element);
}

// add place by user

function elementPopupSubmit(event) {
    event.preventDefault();

    const elementData = {
        name: placeNameInput.value,
        link: placeLinkInput.value,
        alt: placeNameInput.value
    }

    const newElement = createCardInstance(elementData, elementSelector);
    renderElement(elementsContainer, newElement.generateElement(), true);
    closePopup(popupAddPlace);
    event.target.reset();
    addPlaceValidation.toggleSubmit();
}

popupAddPlace.addEventListener('submit', elementPopupSubmit)

// Initialize cards

initialCards.forEach(item => {
    const newElement = createCardInstance(item, elementSelector);
    renderElement(elementsContainer, newElement.generateElement());
})
