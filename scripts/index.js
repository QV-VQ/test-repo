import Card from './Components/Card.js';
import FormValidator from './Components/FormValidator.js';
import Section from './Components/Section.js';
import PopupWithImage from './Components/PopupWithImage.js';
import PopupWithForm from './Components/PopupWithForm.js';
import UserInfo from './Components/UserInfo.js';
import { initialCards, validationConfig } from './data.js';
import { openModal, closeModal, renderLoading } from './utils.js';

// Initialize classes
const userInfo = new UserInfo({
  nameSelector: '.nav__name',
  descriptionSelector: '.nav__job-title'
});

const cardSection = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const card = createCard(cardData);
    cardSection.addItem(card);
  }
}, '#articles');

const imagePopup = new PopupWithImage('#popup__img-zoom');
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm('#edit-profile-popup', handleProfileFormSubmit);
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm('#add-place-popup', handleAddCardFormSubmit);
addCardPopup.setEventListeners();

// Enable form validation
const formValidators = {};

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
  renderLoading(true, profilePopup._submitButton);
  
  setTimeout(() => {
    userInfo.setUserInfo({
      name: formData['edit-name'],
      description: formData['edit-about']
    });
    
    renderLoading(false, profilePopup._submitButton);
    profilePopup.close();
  }, 1000);
}

function handleAddCardFormSubmit(formData) {
  renderLoading(true, addCardPopup._submitButton);
  
  setTimeout(() => {
    const newCard = {
      title: formData['place-title'],
      imageUrl: formData['place-image-url'],
      imageAlt: formData['place-title'],
      isLiked: false
    };
    
    const cardElement = createCard(newCard);
    cardSection.addItem(cardElement);
    
    renderLoading(false, addCardPopup._submitButton);
    addCardPopup.close();
  }, 1000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  cardSection.renderItems();
  
  document.querySelector('.nav__button-edit').addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    document.querySelector('#popup-input-name').value = userData.name;
    document.querySelector('#popup-input-description').value = userData.description;
    formValidators['edit-form'].resetValidation();
    profilePopup.open();
  });
  
  document.querySelector('.nav__button-add').addEventListener('click', () => {
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
