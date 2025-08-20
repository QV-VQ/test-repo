export default class Card {
  constructor({ data, handleCardClick, handleDeleteClick, handleLikeClick }, templateSelector) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
  }

  updateLikeStatus(isLiked) {
    this._isLiked = isLiked;
    this._likeIcon.src = isLiked ? './images/heart-liked.svg' : './images/heart.svg';
    this._likeIcon.alt = isLiked ? 'Unlike this card' : 'Like this card';
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeIcon = this._element.querySelector('.card__like-icon');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__place-title');

    this._cardImage.src = this._data.imageUrl;
    this._cardImage.alt = this._data.imageAlt;
    this._cardTitle.textContent = this._data.title;

    this.updateLikeStatus(this._data.isLiked);
    this._setEventListeners();

    return this._element;
  }
}
