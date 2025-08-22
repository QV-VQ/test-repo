import Card from "./Components/Card.js";
import FormValidator from "./Components/FormValidator.js";
import Section from "./Components/Section.js";
import PopupWithImage from "./Components/PopupWithImage.js";
import PopupWithForm from "./Components/PopupWithForm.js";
import UserInfo from "./Components/UserInfo.js";
import { initialCards, validationConfig, selectors } from "./data.js";

// Initialize classes
const userInfo = new UserInfo({
  nameSelector: selectors.nameSelector,
  descriptionSelector: selectors.descriptionSelector
});

// Create card section
const cardSection = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const card = createCard(cardData);
    cardSection.addItem(card);
  }
}, selectors.cardsSectionSelector);

// Create popups
const imagePopup = new PopupWithImage(selectors.popupImageSelector);
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm(selectors.popupProfileSelector, handleProfileFormSubmit);
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(selectors.popupPlaceSelector, handleAddCardFormSubmit);
addCardPopup.setEventListeners();

// Form validators
const formValidators = {};

// Enable form validation
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

// Card functions
function createCard(cardData) {
  const card = new Card(cardData, '#card-template', {
    handleCardClick: (data) => {
      imagePopup.open(data.imageUrl, data.imageAlt);
    },
    handleLikeClick: (card) => {
      const isLiked = !card._isLiked;
      card.updateLikeStatus(isLiked);
    },
    handleDeleteClick: (card) => {
      card.removeCard();
    }
  });
  return card.generateCard();
}

// Form handlers
function handleProfileFormSubmit(formData) {
  profilePopup.setSubmitButtonText('Saving...');
  
  // Simulate API call with timeout
  setTimeout(() => {
    userInfo.setUserInfo({
      name: formData['edit-name'],
      description: formData['edit-about']
    });
    
    profilePopup.resetSubmitButtonText();
    profilePopup.close();
  }, 1000);
}

function handleAddCardFormSubmit(formData) {
  addCardPopup.setSubmitButtonText('Creating...');
  
  // Simulate API call with timeout
  setTimeout(() => {
    const newCard = {
      title: formData['place-title'],
      imageUrl: formData['place-image-url'],
      imageAlt: formData['place-title'],
      isLiked: false
    };
    
    const cardElement = createCard(newCard);
    cardSection.addItem(cardElement);
    
    addCardPopup.resetSubmitButtonText();
    addCardPopup.close();
  }, 1000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Load user info from local storage if available
  const savedName = localStorage.getItem('name');
  const savedDescription = localStorage.getItem('description');
  
  if (savedName || savedDescription) {
    userInfo.setUserInfo({
      name: savedName,
      description: savedDescription
    });
  }
  
  // Render initial cards
  cardSection.renderItems();
  
  // Edit profile button
  document.querySelector(selectors.editProfileBtnSelector).addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    document.querySelector('#popup-input-name').value = userData.name;
    document.querySelector('#popup-input-description').value = userData.description;
    formValidators['edit-profile-form'].resetValidation();
    profilePopup.open();
  });
  
  // Add new place button
  document.querySelector(selectors.addNewPlaceBtnSelector).addEventListener('click', () => {
    formValidators['add-place-form'].resetValidation();
    addCardPopup.open();
  });
});

// Handle Enter key for form submission
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter' && !evt.shiftKey) {
    const activeElement = document.activeElement;
    if (activeElement.tagName === 'INPUT' && activeElement.type !== 'checkbox') {
      evt.preventDefault();
      const form = activeElement.closest('form');
      if (form && form.checkValidity()) {
        form.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    }
  }
});