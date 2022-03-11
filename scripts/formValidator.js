class formValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;

    }




}

const formsValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__user',
    inputErrorClass: 'popup__user_type_error',
    spanErrorClass: 'popup__input-error_active',
    submitButtonSelector: '.popup__save',
    submitButtonDisabled: 'popup__save_disabled'
};

// validation main function

function enableValidation(config) {
    const forms = [...document.querySelectorAll(config.formSelector)];
    forms.forEach(form => addFormListeners(form, config))
};


// input listeners

function addFormListeners(form, config) {
    form.addEventListener('submit', handleSubmit);
    form.addEventListener('input', () => toggleSubmit(form, config));
    const inputs = [...form.querySelectorAll(config.inputSelector)];
    inputs.forEach(input => input.addEventListener('input', () => validateInput(form, input, config)));

    toggleSubmit(form, config);
};

// disable default submit action

function handleSubmit(event) {
    event.preventDefault();
    event.target.reset();
};


// check input validation

function validateInput(form, input, config) {
    if (input.validity.valid) {
        hideError(form, input, config)
    }
    else {
        showError(form, input, input.validationMessage, config)
    }
};


// show and hide error message

function showError(form, input, errorMessage, config) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.spanErrorClass);
};

function hideError(form, input, config) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(config.spanErrorClass);
};


// activate and deactivate submit button

function toggleSubmit(form, config) {
    const button = form.querySelector(config.submitButtonSelector);
    button.disabled = !form.checkValidity();
    button.classList.toggle(config.submitButtonDisabled, !form.checkValidity())
};


enableValidation(formsValidationConfig);