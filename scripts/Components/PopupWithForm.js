import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
  }

  _getInputValues() {}

  setEventListeners() {
    super();
    // You must add a submit event handler and a click event listener to the form to close the icon.
  }

  close() {
    super();
    // Wipe form.
  }
}
