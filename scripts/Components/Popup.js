import { config } from "../data.js";

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._popupCloseButton = this._popup.querySelector(config.popupCloseButtonSelector);
    this._boundHandleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.remove(config.popupIsHiddenClass);
    this._popup.classList.add(config.popupIsVisibleClass);
    this.setEventListeners();
  }

  close() {
    this._popup.classList.add(config.popupIsHiddenClass);
    this._popup.classList.remove(config.popupIsVisibleClass);
    document.removeEventListener("keydown", this._boundHandleEscClose);
  }

  _handleEscClose(e) {
    const isEscapeKey = e.key === "Escape";
    if (isEscapeKey) {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener("keydown", this._boundHandleEscClose);
    this._popupCloseButton.addEventListener("click", (e) => {
      e.stopPropagation();
      e.stopImmediatePropagation();
      this.close();
    });
    this._popup.addEventListener("click", (e) => {
      const isModal = this._popup === e.target;
      if (isModal) this.close();
    });
  }
}
