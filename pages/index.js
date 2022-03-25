import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import { initialCards } from "../scripts/utils/icards.js";

const popupActiveClass = 'popup_active';
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const userName = document.querySelector('.profile__user-name');
const userInfo = document.querySelector('.profile__user-status');
const nameInput = document.querySelector('.popup__user_type_name');
const jobInput = document.querySelector('.popup__user_type_description');
const popupForm = document.querySelector('.popup__form');
const buttonCloseAdd = document.querySelector('.popup__close-add');
const placeAddButton = document.querySelector('.profile__add-button');
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

// Validation section

const createValidatorInstance = (config, form) => {
    const formValidationInstance = new FormValidator(config, form);
    return formValidationInstance;
};

/* enable forms validation */

const profileFormValidation = createValidatorInstance(formsValidationConfig, popupEditProfileForm);
profileFormValidation.enableValidation();

const addPlaceValidation = createValidatorInstance(formsValidationConfig, popupAddPlaceForm);
addPlaceValidation.enableValidation();


// Profile manage section

const userInfoInstance = new UserInfo({
    userName: userName,
    userInfo: userInfo
});

const editProfileInstance = new PopupWithForm(popupEditProfile, {
    submitFormCallback: (data) => {
        userInfoInstance.setUserInfo(data);
        editProfileInstance.close();
    }
});

editProfileInstance.setEventListeners();

/* open edit profile popup */
buttonEditProfile.addEventListener('click', () => {
    editProfileInstance.open();
    const userData = userInfoInstance.getUserInfo()
    nameInput.value = userData.userName;
    jobInput.value = userData.userInfo;
    profileFormValidation.toggleSubmit();
});

buttonClose.addEventListener('click', () => {
    editProfileInstance.close();
});


// Enlarge image section

const popupImageEnlarge = new PopupWithImage(popupImage);

const placeImageEnlarge = (evt) => {
    const elementData = {
        name: evt.target.parentNode.querySelector('.element__name-place').textContent,
        link: evt.target.src,
        alt: evt.target.alt
    };
    popupImageEnlarge.open(elementData);
}

popupImageEnlarge.setEventListeners();


// Place (cards) section

const createCardInstance = (element) => {
    const newElement = new Card(element, elementSelector, placeImageEnlarge);
    return newElement.generateElement();
};

/* place renderer */

const renderElement = (item, toBeggining) => {
    const element = createCardInstance(item);
    placesListSection.addItem(element, toBeggining);
};

/* places Section */

const placesListSection = new Section(
    { items: initialCards, renderer: renderElement },
    elementsContainer
);

/* create place */

const newPlacePopup = new PopupWithForm(popupAddPlace, {
    submitFormCallback: (data) => {
        const elementData = {
            name: data.placeNameInput,
            link: data.placeLinkInput,
            alt: data.placeNameInput
        }
        renderElement(elementData, true);
        newPlacePopup.close();
        addPlaceValidation.toggleSubmit();

    }
});

newPlacePopup.setEventListeners();

/* initialize cards */

placesListSection.renderElements();

/* add place popup */

placeAddButton.addEventListener('click', () => {
    newPlacePopup.open();
});
