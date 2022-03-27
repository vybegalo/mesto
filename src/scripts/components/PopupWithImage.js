import Popup from './Popup.js'
import { unavailable } from "../utils/icards.js";

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
        this._imageLarge.onerror = function () {
            this.src = unavailable;
        }
            ;
        this._imageTitle.textContent = elementData.name;
    }
}