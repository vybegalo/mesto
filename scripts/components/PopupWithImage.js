import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._imageLarge = popup.querySelector('.popup__image-large');
        this._imageTitle = popup.querySelector('.popup__image-title');

    }

    open(elementData) {
        super.open();
        this._imageLarge.src = elementData.link;
        this._imageLarge.alt = elementData.alt;
        this._imageTitle.textContent = elementData.name;
    }
}