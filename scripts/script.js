// Popup open/close section

const popupActiveClass = 'popup_active';

const closeOnEvent = (evt) => {
    if ((evt.key === 'Escape') || (evt.target === evt.currentTarget)) {
        const popupOpened = document.querySelector(`.${popupActiveClass}`);
        const elementForm = popupOpened.querySelector('.popup__form');
        closePopup(popupOpened);
        if (elementForm) {
            elementForm.reset();
        }
    }
};

function openPopup(node) {
    node.classList.add(popupActiveClass);
    node.addEventListener('mousedown', closeOnEvent);
    document.addEventListener('keydown', closeOnEvent);
}

function closePopup(node) {
    node.classList.remove(popupActiveClass);
    node.removeEventListener('mousedown', closeOnEvent);
    document.removeEventListener('keydown', closeOnEvent);
};


// Popup section button "edit profile"

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const userName = document.querySelector('.profile__user-name');
const userInfo = document.querySelector('.profile__user-status');
const nameInput = document.querySelector('.popup__user_type_name');
const jobInput = document.querySelector('.popup__user_type_description');
const popupForm = document.querySelector('.popup__form');


buttonEditProfile.addEventListener('click', () => {
    nameInput.value = userName.textContent;
    jobInput.value = userInfo.textContent;
    openPopup(popupEditProfile);
});

buttonClose.addEventListener('click', () => {
    closePopup(popupEditProfile);
    popupForm.reset();
});

popupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    userName.textContent = nameInput.value;
    userInfo.textContent = jobInput.value;
    closePopup(popupEditProfile);
});


// Popup section button "add"

const profileAddButton = document.querySelector('.profile__add-button');
const buttonCloseAdd = document.querySelector('.popup__close-add');
const popupAddPlace = document.querySelector('.popup_type_add-place');
const popupAddPlaceForm = popupAddPlace.querySelector('.popup__form');

profileAddButton.addEventListener('click', () => {
    openPopup(popupAddPlace);
});

buttonCloseAdd.addEventListener('click', () => {
    closePopup(popupAddPlace);
    popupAddPlaceForm.reset();
});

// popup section enlarge

const popupImage = document.querySelector('.popup_image');
const imageLarge = popupImage.querySelector('.popup__image-large');
const imageTitle = popupImage.querySelector('.popup__image-title');
const popupButtonImageClose = popupImage.querySelector('.popup__close-image');

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

const placeNameInput = document.querySelector('.popup__user_type_place-name');
const placeLinkInput = document.querySelector('.popup__user_type_place-link');
const elementsContainer = document.querySelector(".elements");

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
    popupAddPlaceForm.reset();
}

popupAddPlace.addEventListener('submit', elementPopupSubmit)


initialCards.forEach(item => {
    renderElement(elementsContainer, addElement(item));
})

