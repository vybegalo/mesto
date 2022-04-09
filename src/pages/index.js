import "./index.css";
import "../index.html";
import Api from "../scripts/components/Api.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import {
    buttonEditProfile, popupEditProfile, buttonSubmitProfile,
    userName, userInfo, userAvatar, nameInput, jobInput,
    popupChangeAvatar, popupChangeAvatarForm, popupConfirmDelete,
    buttonSubmitAvatar, placeAddButton, popupAddPlace, buttonConfirmDelete,
    buttonSubmitPlace, popupImage, elementsContainer, elementSelector,
    popupEditProfileForm, popupAddPlaceForm, formsValidationConfig
} from "../scripts/utils/constants.js";

let placesList = [];
let placesListSection = null;
const formValidators = {}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-38',
    headers: {
        authorization: '8f3f41bd-1c8a-4382-89e9-88174d98da09',
        'Content-Type': 'application/json',
    },
});

// Validation section

const enableValidation = (config) => {
    const formList = [...document.querySelectorAll(config.formSelector)]
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement)
        const formName = formElement.getAttribute('name')
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

/* enable forms validation */
enableValidation(formsValidationConfig);


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
            editProfileInstance.close();
        })
        .catch((err) => {
            console.log(`Cannot update user profile: ${err}`);
        })
        .finally(() => {
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
    formValidators[popupEditProfileForm.getAttribute('name')].resetValidation();
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
            popupChangeAvatarInstance.close();
        })
        .catch((err) => {
            console.log(`Cannot update user avatar: ${err}`);
        })
        .finally(() => {
            buttonSubmitAvatar.textContent = 'Сохранить';
        });
}

userAvatar.addEventListener('click', () => {
    popupChangeAvatarInstance.open();
    formValidators[popupChangeAvatarForm.getAttribute('name')].resetValidation();
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
            element.updateLikes(currentUser);
        })
        .catch((err) => {
            console.log(`Cannot update likes: ${err}`);
        });
}

/* delete confirmation popup */
const popupConfirmDeleteInstance = new PopupWithConfirmation(popupConfirmDelete, {
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
            popupConfirmDeleteInstance.close();
        })
        .catch((err) => {
            console.log(`Cannot remove place: ${err}`);
        })
        .finally(() => {
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
            newPlacePopup.close();
        })
        .catch((err) => {
            console.log(`Cannot save new place on server: ${err}`);
        })
        .finally(() => {
            buttonSubmitPlace.textContent = 'Создать';
        });
}

newPlacePopup.setEventListeners();

/* add place popup */
placeAddButton.addEventListener('click', () => {
    newPlacePopup.open();
    formValidators[popupAddPlaceForm.getAttribute('name')].resetValidation();
});


// Fetch data from server section

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
        /* get user data */
        userInfoInstance.setUserInfo({ userName: userData.name, userInfo: userData.about });
        userInfoInstance.setUserAvatar(userData.avatar);
        userInfoInstance.setUserID(userData._id);
        /* get places cards */
        placesList = cards.map((item) => ({
            name: item.name,
            link: item.link,
            alt: item.name,
            likes: item.likes,
            owner: item.owner._id,
            id: item._id,
        }));
        /* render cards */
        placesListSection = new Section(
            { items: placesList, renderer: renderElement },
            elementsContainer
        );
        placesListSection.renderElements();
    })
    .catch((err) => {
        console.log(`Failed to fetch information from server: ${err}`);
    })
