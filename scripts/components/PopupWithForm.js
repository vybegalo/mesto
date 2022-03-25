import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popup, { submitFormCallback }) {
        super(popup);
        this._submitFormCallback = submitFormCallback;
        this._form = popup.querySelector('.popup__form');
        this._inputs = [...this._form.querySelectorAll('.popup__user')];
        // attach context for _submitForm
        this._submitForm = this._submitForm.bind(this);

    }

    _getInputValues() {
        this._formValues = {};
        this._inputs.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    _submitForm(event) {
        event.preventDefault();
        this._submitFormCallback(this._getInputValues());
        event.target.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitForm);
    }

    close() {
        super.close();
        this._form.reset();
    }

}