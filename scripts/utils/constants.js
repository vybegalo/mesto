export const popupActiveSelector = '.popup_active';
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonClose = document.querySelector('.popup__close');
export const popupEditProfile = document.querySelector('.popup_edit-profile');
export const userName = document.querySelector('.profile__user-name');
export const userInfo = document.querySelector('.profile__user-status');
export const nameInput = document.querySelector('.popup__user_type_name');
export const jobInput = document.querySelector('.popup__user_type_description');
export const placeAddButton = document.querySelector('.profile__add-button');
export const popupAddPlace = document.querySelector('.popup_type_add-place');
export const popupImage = document.querySelector('.popup_image');
export const elementsContainer = document.querySelector('.elements');
export const elementSelector = '#elementTemplate';
export const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
export const popupAddPlaceForm = popupAddPlace.querySelector('.popup__form');
export const formsValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__user',
    inputErrorClass: 'popup__user_type_error',
    spanErrorClass: 'popup__input-error_active',
    submitButtonSelector: '.popup__save',
    submitButtonDisabled: 'popup__save_disabled'
};
