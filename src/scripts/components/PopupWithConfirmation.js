import Popup from './Popup.js'

export default class PopupWithConfirmation extends Popup {
    constructor(popup, { submitCallback }) {
        super(popup);
        this._submitButton = this._popup.querySelector('.popup__delete-button');
        this._submitCallback = submitCallback;
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', (event) => {
            event.preventDefault();
            this._submitCallback(this._element);
        });
    }

    open(element) {
        this._element = element;
        super.open();
    }

}