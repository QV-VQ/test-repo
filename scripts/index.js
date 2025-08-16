import Card from "./Components/Card.js";
import FormValidator from "./Components/FormValidator.js";
import Popup from "./Components/Popup.js";
import Section from "./Components/Section.js";
import { articlesContent, config } from "./data.js";
import { updateDetails, toggleModal, controlProfileForm, manageModals, manageCardController } from "./utils.js";

function controlAddPlaceForm(e) {
  e.preventDefault();

  config.placeDetails.title = config.placeInputTitle.value;
  config.placeDetails.imageSrc = config.formInputSource.value;

  config.articlesSection.prepend(new Card(config.placeDetails).create());
  toggleModal(config.addPlacePopup);
}

const cardsSection = new Section(
  {
    items: articlesContent,
    renderer: (item) => {
      const card = new Card({
        article: item,
        handleCardClick: (evt) => {
          manageCardController(evt);
        },
      }).create();
      cardsSection.addItem(card);
    },
  },
  config.cardsSectionSelector
);
cardsSection.renderItems();

(function validateForms() {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => new FormValidator(form, config).enableValidations());
})();

(function setPageEventListeners() {
  window.addEventListener("load", updateDetails);
  // config.articlesSection.addEventListener("click", manageCardController);
  document.addEventListener("click", manageModals);
  config.profileForm.addEventListener("submit", controlProfileForm);
  config.addPlaceForm.addEventListener("submit", controlAddPlaceForm);
  config.popups.forEach((popup) => {
    popup.addEventListener("click", (e) => {
      e.stopPropagation();
      e.stopImmediatePropagation();
      manageModals(e, popup);
    });
  });
})();

// // create an instance of each popup

const examplepop = new Popup(config.popupPlaceSelector);
examplepop.open();
