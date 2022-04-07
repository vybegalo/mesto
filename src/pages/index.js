import "./index.css";
import "../index.html";
import Api from "../scripts/components/Api.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithConfirm from "../scripts/components/PopupWithConfirm.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import { initialCards } from "../scripts/utils/icards.js";
import {
    buttonEditProfile, buttonClose, popupEditProfile,
    buttonSubmitProfile, userName, userInfo, userAvatar, nameInput,
    jobInput, popupChangeAvatar, popupChangeAvatarForm, popupConfirmDelete,
    buttonSubmitAvatar, placeAddButton, popupAddPlace, buttonConfirmDelete,
    buttonSubmitPlace, popupImage, elementsContainer, elementSelector,
    popupEditProfileForm, popupAddPlaceForm, formsValidationConfig
} from "../scripts/utils/constants.js";

let placesList = [];
let placesListSection = null;

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-38',
    headers: {
        authorization: '8f3f41bd-1c8a-4382-89e9-88174d98da09',
        'Content-Type': 'application/json',
    },
});

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
const updateUserAvatarValidation = createValidatorInstance(formsValidationConfig, popupChangeAvatarForm);
updateUserAvatarValidation.enableValidation();


// Profile manage section

const userInfoInstance = new UserInfo({
    userName: userName,
    userInfo: userInfo,
    userAvatar: userAvatar
});

/* save user data on server */
const saveUserProfile = (data) => {
    buttonSubmitProfile.textContent = 'Сохранение...';
    api.updateUserProfile(data)
        .then((res) => {
            userInfoInstance.setUserInfo({ userName: res.name, userInfo: res.about });
            userInfoInstance.setUserID(res._id);
        })
        .catch((err) => {
            console.log(`Cannot update user profile: ${err}`);
        })
        .finally(() => {
            editProfileInstance.close();
            buttonSubmitProfile.textContent = 'Сохранить';
        });
}

const editProfileInstance = new PopupWithForm(popupEditProfile, {
    submitFormCallback: (data) => {
        saveUserProfile(data);
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

buttonClose.addEventListener('click', () => {
    editProfileInstance.close();
});

/* update avatar popup */
const popupChangeAvatarInstance = new PopupWithForm(popupChangeAvatar, {
    submitFormCallback: (data) => {
        saveUserAvatar(data);
    }
});

/* save user avatar */
const saveUserAvatar = (data) => {
    buttonSubmitAvatar.textContent = 'Сохранение...';
    api.updateUserAvatar(data)
        .then((res) => {
            userInfoInstance.setUserAvatar(res.avatar);
            userInfoInstance.setUserID(res._id);
        })
        .catch((err) => {
            console.log(`Cannot update user avatar: ${err}`);
        })
        .finally(() => {
            popupChangeAvatarInstance.close();
            buttonSubmitAvatar.textContent = 'Сохранить';
        });
}

userAvatar.addEventListener('click', () => {
    popupChangeAvatarInstance.open(userInfoInstance.getUserAvatar());
    updateUserAvatarValidation.resetValidation();
});

popupChangeAvatarInstance.setEventListeners();


// Enlarge image section

const popupImageEnlarge = new PopupWithImage(popupImage);

const handleImageClick = (element) => {
    popupImageEnlarge.open(element);
}

popupImageEnlarge.setEventListeners();


// Place (cards) section


/* set/unset likes handler */
const handleLikeClick = (element) => {
    const id = element.getPlaceID();
    const currentUser = userInfoInstance.getUserID();
    const likeState = element.isLiked();
    const likeFunc = likeState
        ? (placeID) => api.removeLike(placeID)
        : (placeID) => api.addLike(placeID);

    likeFunc(id)
        .then((res) => {
            element.setLikes(res.likes);
        })
        .catch((err) => {
            console.log(`Cannot update likes: ${err}`);
            element.setLikes(!likeState ? [{ _id: currentUser }] : []);
        })
        .finally(() => {
            element.updateLikes(currentUser);
        });
}

/* delete confirmation popup */
const popupConfirmDeleteInstance = new PopupWithConfirm(popupConfirmDelete, {
    submitCallback: (element) => {
        handleDeleteClick(element);
    }
});

/* place delete handler */
const handleDeleteClick = (element) => {
    buttonConfirmDelete.textContent = 'Удаление...';
    api.deletePlace(element.getPlaceID())
        .then(() => {
            element.delete();
        })
        .catch((err) => {
            console.log(`Cannot remove place: ${err}`);
        })
        .finally(() => {
            popupConfirmDeleteInstance.close();
            buttonConfirmDelete.textContent = 'Да';
        });
}

popupConfirmDeleteInstance.setEventListeners();

/* place card instance */
const createCardInstance = (element) => {
    const newElement = new Card(
        element,
        elementSelector,
        () => handleImageClick(element),
        (clickedElement) => handleLikeClick(clickedElement),
        (clickedElement) => popupConfirmDeleteInstance.open(clickedElement)
    );
    return newElement.generateElement(userInfoInstance.getUserID());
};

/* place renderer */
const renderElement = (item, toBeggining) => {
    const element = createCardInstance(item);
    placesListSection.addItem(element, toBeggining);
};

/* create place */
const newPlacePopup = new PopupWithForm(popupAddPlace, {
    submitFormCallback: (data) => {
        saveNewPlace(data);
    }
});

function saveNewPlace(data) {
    buttonSubmitPlace.textContent = 'Сохранение...';
    api.addNewPlace({ name: data.name, link: data.link })
        .then((res) => {
            renderElement({
                name: res.name,
                link: res.link,
                alt: res.name,
                likes: res.likes,
                owner: res.owner._id,
                id: res._id,
            }, true);
        })
        .catch((err) => {
            console.log(`Cannot save new place on server: ${err}`);
        })
        .finally(() => {
            newPlacePopup.close();
            buttonSubmitPlace.textContent = 'Создать';
        });
}

newPlacePopup.setEventListeners();

/* add place popup */
placeAddButton.addEventListener('click', () => {
    newPlacePopup.open();
    addPlaceValidation.resetValidation();
});


// Fetch data from server section

api.getUserInfo()
    /* get user data */
    .then((res) => {
        userInfoInstance.setUserInfo({ userName: res.name, userInfo: res.about });
        userInfoInstance.setUserAvatar(res.avatar);
        userInfoInstance.setUserID(res._id);
    })
    .catch((err) => {
        console.log(`Cannot get user information: ${err}`);
    })
    .finally(() => {
        /* get places cards */
        api.getInitialCards()
            .then((res) => {
                placesList = res.map((item) => ({
                    name: item.name,
                    link: item.link,
                    alt: item.name,
                    likes: item.likes,
                    owner: item.owner._id,
                    id: item._id,
                }));
            })
            .catch((err) => {
                console.log(`Cannot load cards from server: ${err}`);
                placesList = initialCards;
            })
            .finally(() => {
                /* render cards */
                placesListSection = new Section(
                    { items: placesList, renderer: renderElement },
                    elementsContainer
                );
                placesListSection.renderElements();
            });
    });