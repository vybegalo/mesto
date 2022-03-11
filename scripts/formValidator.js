class FormValidator {

    constructor(config, form) {
        this._config = config;
        this._form = form;
    }

    // show and hide error message
    _showError(input) {
        const errorElement = this._form.querySelector(`#${input.id}-error`);
        input.classList.add(this._config.inputErrorClass);
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(this._config.spanErrorClass);
    };

    _hideError(input) {
        const errorElement = this._form.querySelector(`#${input.id}-error`);
        input.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._config.spanErrorClass);
    };

    // check input validation
    _validateInput(input) {
        if (input.validity.valid) {
            this._hideError(input)
        }
        else {
            this._showError(input)
        }
    };

    // activate and deactivate submit button
    _toggleSubmit() {
        const button = this._form.querySelector(this._config.submitButtonSelector);
        button.disabled = !this._form.checkValidity();
        button.classList.toggle(this._config.submitButtonDisabled, !this._form.checkValidity())
    };

    // disable default submit action
    _handleSubmit(event) {
        event.preventDefault();
        event.target.reset();
    };

    // input listeners
    _addFormListeners() {
        this._form.addEventListener('submit', this._handleSubmit);
        this._form.addEventListener('input', () => this._toggleSubmit());
        const inputs = [...this._form.querySelectorAll(this._config.inputSelector)];
        inputs.forEach(input => input.addEventListener('input', () => this._validateInput(input)));
        this._toggleSubmit();
    };

    // validation public function
    enableValidation() {
        this._addFormListeners();
    };

}

export { FormValidator };