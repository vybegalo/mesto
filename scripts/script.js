// Popup section button "edit"

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const popupActiveClass = 'popup_active';
let userName = document.querySelector('.profile__user-name');
let userInfo = document.querySelector('.profile__user-status');
let nameInput = document.querySelector('.popup__user_type_name');
let jobInput = document.querySelector('.popup__user_type_description');
let popupForm = document.querySelector('.popup__form');

function openPopup() {
    nameInput.value = userName.textContent;
    jobInput.value = userInfo.textContent;
    popup.classList.add(popupActiveClass);
};

function closePopup() {
    popup.classList.remove(popupActiveClass);
};

function formSubmitHandler(event) {
    event.preventDefault();
    userName.textContent = nameInput.value;
    userInfo.textContent = jobInput.value;
    closePopup();
};

buttonEditProfile.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);


// Popup section button "add"

const profileAddButton = document.querySelector('.profile__add-button');
const buttonCloseAdd = document.querySelector('.popup__close-add');
const popupAddPlace = document.querySelector('.popup__type_add-place');



function openPopupAdd() {
    popupAddPlace.classList.add(popupActiveClass);
};

profileAddButton.addEventListener('click', openPopupAdd);

function closePopupAdd() {
    popupAddPlace.classList.remove(popupActiveClass);
};

buttonCloseAdd.addEventListener('click', closePopupAdd);



// Elements section
const placeNameInput = document.querySelector('.popup__place_type_name');
const placeLinkInput = document.querySelector('.popup__place_type_link');
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
    /* add trash function listener */
    /* add enlarge function listener */

    return element;
}

function renderElement(elementsContainer, element, order = "last") {
    if (order === "first") {
        elementsContainer.prepend(element);
    } else {
        elementsContainer.append(element);
    }
}


function handleElementPopupSubmit(e) {
    e.preventDefault();


    const elementData = {
        name: placeNameInput.value,
        link: placeLinkInput.value,
        alt: "Фото от пользователя"
    }

    const newElement = addElement(elementData);
    renderElement(elementsContainer, newElement, "first");
    closePopupAdd();
}

popupAddPlace.addEventListener('submit', handleElementPopupSubmit)


initialCards.forEach(item => {
    const element = addElement(item);
    renderElement(elementsContainer, element);
})
