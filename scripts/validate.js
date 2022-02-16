const formsValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__user'
};

function enableValidation(data) {
    const form = [...document.querySelectorAll(data.formSelector)]
};

enableValidation(formsValidationConfig);