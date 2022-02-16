const formsValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__user',
    inputErrorClass: 'popup__user_type_error'
};

function enableValidation(config) {
    const forms = [...document.querySelectorAll(config.formSelector)];

    forms.forEach(form => addFormListeners(form, config))
};

function addFormListeners(form, config) {

    form.addEventListener('submit', toggleSubmit);

    const inputs = [...form.querySelectorAll(config.inputSelector)];

    inputs.forEach(input => input.addEventListener('input', () => validateInput(form, input, config)));

};

function toggleSubmit(event) {
    event.preventDefault()
};

function validateInput(form, input, config) {
    console.log("VALIDATING input", input)
    if (input.validity.valid) {
        hideError(form, input, config)
        console.log('valid form')
    }
    else {
        showError(form, input, config)
        console.log('invalid form')
    }
};

function showError(form, input, config) {
    input.classList.add(config.inputErrorClass);

};

function hideError(form, input, config) {
    input.classList.remove(config.inputErrorClass);

};


enableValidation(formsValidationConfig);