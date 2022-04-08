import { unavailable } from "../utils/constants.js";

export default class Card {
    constructor(item, elementSelector, handleImageClick, handleLikeClick, handleDeleteClick) {
        this._name = item.name;
        this._link = item.link;
        this._alt = item.alt;
        this._likes = item.likes;
        this._isLiked = false;
        this._owner = item.owner;
        this._id = item.id;
        this._elementSelector = elementSelector;
        this._handleImageClick = handleImageClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;

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

    getPlaceID() {
        return this._id;
    }

    // likes functions section
    isLiked() {
        return this._isLiked;
    }
    setLikes(likes) {
        this._likes = likes;
    }
    _setLikeButton() {
        this._elementLike.classList.add('element__like_active');
    }

    _unsetLikeButton() {
        this._elementLike.classList.remove('element__like_active');
    }

    updateLikes(currentUser) {
        this._isLiked = this._likes.some((user) => user._id === currentUser);
        this._elementLikeCounter.textContent = String(this._likes.length);
        if (this._isLiked) { this._setLikeButton(); }
        else { this._unsetLikeButton(); }
    }

    // remove card

    delete() {
        this._element.remove();
        this._element = null;
    }

    // generate card element
    generateElement(userID) {
        this._element = this._getElement();
        this._elementName = this._element.querySelector('.element__name-place');
        this._elementTrash = this._element.querySelector('.element__trash-bin');
        this._elementLike = this._element.querySelector('.element__like');
        this._elementImage = this._element.querySelector('.element__image');

        /* set place properties */
        this._elementName.textContent = this._name;
        this._elementImage.src = this._link;
        this._elementImage.alt = this._alt;
        this._elementImage.onerror = function () {
            this.src = unavailable;
        }

        /* set number of likes */
        this._elementLikeCounter = this._element.querySelector('.element__like-counter');
        this.updateLikes(userID)

        /* show/hide trash button */
        const owned = (this._owner === userID);
        this._elementTrash.disabled = !owned;
        this._elementTrash.hidden = !owned;

        this._addEventListeners();
        return this._element;
    }

    _addEventListeners() {

        // like function listener
        this._elementLike.addEventListener('click', () => {
            this._handleLikeClick(this);
        });

        // trash function listener
        this._elementTrash.addEventListener('click', () => {
            this._handleDeleteClick(this);
        });

        // enlarge function listener
        this._elementImage.addEventListener('click', this._handleImageClick);

    }

}
