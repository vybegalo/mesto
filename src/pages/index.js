import "./index.css";
import "../index.html";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import { initialCards } from "../scripts/utils/icards.js";
import {
    buttonEditProfile, buttonClose, popupEditProfile,
    userName, userInfo, nameInput,
    jobInput, placeAddButton, popupAddPlace,
    popupImage, elementsContainer, elementSelector,
    popupEditProfileForm, popupAddPlaceForm, formsValidationConfig
} from "../scripts/utils/constants.js";



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
    profileFormValidation.resetValidation();
});

// Enlarge image section

const popupImageEnlarge = new PopupWithImage(popupImage);

const handleImageClick = (element) => {
    popupImageEnlarge.open(element);
}

popupImageEnlarge.setEventListeners();


// Place (cards) section

const createCardInstance = (element) => {
    const newElement = new Card(element, elementSelector, () => handleImageClick(element));
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
            name: data.name,
            link: data.link,
            alt: data.name
        }
        renderElement(elementData, true);
        newPlacePopup.close();

    }
});

newPlacePopup.setEventListeners();

/* initialize cards */

placesListSection.renderElements();

/* add place popup */

placeAddButton.addEventListener('click', () => {
    newPlacePopup.open();
    addPlaceValidation.resetValidation();
});
