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
const popupImage = document.querySelector('.popup_image');
const imageLarge = popupImage.querySelector('.popup__image-large');
const imageTitle = popupImage.querySelector('.popup__image-title');
const popupButtonImageClose = popupImage.querySelector('.popup__close-image');
const placeNameInput = document.querySelector('.popup__user_type_place-name');
const placeLinkInput = document.querySelector('.popup__user_type_place-link');
const elementsContainer = document.querySelector(".elements");

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

function openPopup(popup) {
    popup.classList.add(popupActiveClass);
    popup.addEventListener('mousedown', closeOnSideClick);
    document.addEventListener('keydown', closeOnEsc);
}

function closePopup(popup) {
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


// popup section enlarge

function elementImageEnlarge(item, name) {
    openPopup(popupImage);
    imageLarge.src = item.src;
    imageLarge.alt = item.alt;
    imageTitle.textContent = name;
};

popupButtonImageClose.addEventListener('click', () => {
    closePopup(popupImage);
});


// Elements (cards) section

function addElement(item) {

    const elementTemplate = document.querySelector('#elementTemplate').content;
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    const elementName = element.querySelector('.element__name-place');
    const elementImage = element.querySelector('.element__image');
    const elementTrash = element.querySelector('.element__trash-bin');
    const elementLike = element.querySelector('.element__like');

    elementName.textContent = item.name;
    elementImage.src = item.link;
    elementImage.alt = item.alt;

    // add like function listener

    elementLike.addEventListener('click', () => {
        elementLike.classList.toggle('element__like_active');
    });


    // add trash function listener

    elementTrash.addEventListener('click', () => {
        const currentElement = elementTrash.closest('.element');
        currentElement.remove();
    });


    // add enlarge function listener

    elementImage.addEventListener('click', () => {
        elementImageEnlarge(elementImage, elementName.textContent);
    });

    return element;
}

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

    const newElement = addElement(elementData);
    renderElement(elementsContainer, newElement, true);
    closePopup(popupAddPlace);
}

popupAddPlace.addEventListener('submit', elementPopupSubmit)


initialCards.forEach(item => {
    renderElement(elementsContainer, addElement(item));
})

