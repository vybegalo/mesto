import { popupActiveSelector } from "../utils/constants.js";

export default class Popup {
    constructor(popup) {
        this._popup = popup;
        this._buttonClose = this._popup.querySelector('.popup__close');
        this._closeOnEsc = this._closeOnEsc.bind(this);
        this._closeOnSideClick = this._closeOnSideClick.bind(this);
    }

    open() {
        this._popup.classList.add(popupActiveSelector);
        document.addEventListener('keydown', this._closeOnEsc);
        this._popup.addEventListener('mousedown', this._closeOnSideClick);
    }

    close() {
        this._popup.classList.remove(popupActiveSelector);
        document.removeEventListener('keydown', this._closeOnEsc);
        this._popup.removeEventListener('mousedown', this._closeOnSideClick);
    }

    _closeOnEsc(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _closeOnSideClick(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this._buttonClose.addEventListener('click', () => this.close());
    }
}