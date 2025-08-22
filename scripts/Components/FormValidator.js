class FormValidator {
  constructor(form, config) {
    this._form = form;
    this._config = config;
  }

  _showInputError = (input) => {
    const errorElement = this._form.querySelector(`#${input.id}-error`);

    input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  };

  _hideInputError = (input) => {
    const errorElement = this._form.querySelector(`#${input.id}-error`);

    input.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  };

  _toggleErrorDisplay = (input) => {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  };

  _checkInputListValidity = () => {
    return this._inputList.every((input) => input.validity.valid);
  };

  _toggleSubmitBtnState = () => {
    const areValidInputs = this._checkInputListValidity();
    this._submitButton.disabled = !areValidInputs;
  };

  _getInputs = () => {
    return Array.from(this._form.querySelectorAll(this._config.inputSelector));
  };

  _setEventListeners = () => {
    this._inputList.forEach((input) => {
      input.addEventListener("input", (e) => {
        e.stopPropagation();
        e.stopImmediatePropagation();

        this._toggleErrorDisplay(input);
        this._toggleSubmitBtnState();
      });
    });
  };

  enableValidations = () => {
    this._inputList = this._getInputs();
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
    this._submitButton.disabled = true;

    this._setEventListeners();
  };
}
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
export default FormValidator;
