import { unavailable } from "../utils/icards.js";

export default class Card {
    constructor(item, elementSelector, handleCardClick) {
        this._name = item.name;
        this._link = item.link;
        this._alt = item.alt;
        this._elementSelector = elementSelector;
        this._handleCardClick = handleCardClick;
    };

    // get element template
    _getElement() {
        const elementTemplate = document
            .querySelector(this._elementSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return elementTemplate;
    };

    // generate card element
    generateElement() {
        this._element = this._getElement();
        this._elementName = this._element.querySelector('.element__name-place');
        this._elementTrash = this._element.querySelector('.element__trash-bin');
        this._elementLike = this._element.querySelector('.element__like');
        this._elementImage = this._element.querySelector('.element__image');

        this._elementName.textContent = this._name;
        this._elementImage.src = this._link;
        this._elementImage.alt = this._alt;
        this._elementImage.onerror = function () {
            this.src = unavailable;
        }

        this._addEventListeners();
        return this._element;
    }

    _addEventListeners() {

        // like function listener
        this._elementLike.addEventListener('click', () => {
            this._elementLike.classList.toggle('element__like_active');
        });

        // trash function listener
        this._elementTrash.addEventListener('click', () => {
            this._element.remove();
            this._element = null;
        });

        // enlarge function listener
        this._elementImage.addEventListener('click', this._handleCardClick);

    }

}
