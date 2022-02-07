// Popup open/close section

const popupActiveClass = 'popup_active';

function openPopup(node) {
    node.classList.add(popupActiveClass);
}

function closePopup(node) {
    node.classList.remove(popupActiveClass);
};


// Popup section button "edit profile"

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const userName = document.querySelector('.profile__user-name');
const userInfo = document.querySelector('.profile__user-status');
const nameInput = document.querySelector('.popup__user_type_name');
const jobInput = document.querySelector('.popup__user_type_description');
const popupForm = document.querySelector('.popup__form');


buttonEditProfile.addEventListener('click', () => {
    nameInput.value = userName.textContent;
    jobInput.value = userInfo.textContent;
    openPopup(popup);
});

buttonClose.addEventListener('click', () => {
    popupForm.reset();
    closePopup(popup);
});

popupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    userName.textContent = nameInput.value;
    userInfo.textContent = jobInput.value;
    closePopup(popup);
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
    popupAddPlaceForm.reset();
    closePopup(popupAddPlace);
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

// Elements (cards) section

const placeNameInput = document.querySelector('.popup__user_type_plase-name');
const placeLinkInput = document.querySelector('.popup__user_type_plase-link');
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

    /* add like function listener */

    elementLike.addEventListener('click', () => {
        elementLike.classList.toggle('element__like_active');
    });


    /* add trash function listener */

    elementTrash.addEventListener('click', () => {
        const currentElement = elementTrash.closest('.element');
        currentElement.remove();
    });


    /* add enlarge function listener */

    elementImage.addEventListener('click', () => {
        elementImageEnlarge(elementImage, elementName.textContent);
    });

    popupButtonImageClose.addEventListener('click', () => {
        closePopup(popupImage);
    });

    return element;
}

function renderElement(elementsContainer, element, order = "last") {
    if (order === "first") {
        elementsContainer.prepend(element);
    } else {
        elementsContainer.append(element);
    }
}

/* add photo by user */

function elementPopupSubmit(event) {
    event.preventDefault();

    const elementData = {
        name: placeNameInput.value,
        link: placeLinkInput.value,
        alt: "Фото от пользователя"
    }

    const newElement = addElement(elementData);
    renderElement(elementsContainer, newElement, "first");
    popupAddPlaceForm.reset();
    closePopup(popupAddPlace);
}

popupAddPlace.addEventListener('submit', elementPopupSubmit)


initialCards.forEach(item => {
    const element = addElement(item);
    renderElement(elementsContainer, element);
})
