import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector('.popup__image');
    this._captionElement = this._popup.querySelector('.popup__figcaption');
  }

  open(imageSrc, imageAlt) {
    this._imageElement.src = imageSrc;
    this._imageElement.alt = imageAlt;
    this._captionElement.textContent = imageAlt;
    super.open();
  }
}