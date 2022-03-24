import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popup, { submitFormCallback }) {
        super(popup);
        this._submitFormCallback = submitFormCallback;
        this._form = popup.querySelector('.popup__form');
        this._inputs = [...this._form.querySelectorAll('.popup__user')];

    }

    _getInputValues() {
        this._formValues = {};
        this._inputs.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.setEventListeners('submit', (event) => {
            event.preventDefault();
            this._submitFormCallback(this._getInputValues());
            event.target.reset();
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

}