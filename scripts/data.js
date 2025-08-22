export const initialCards = [
  {
    title: "Stuttgart",
    imageUrl: "./images/stuttgart.webp",
    imageAlt: "Image of a beautiful hill in Stuttgart Germany",
    isLiked: false,
  },
  {
    title: "Berlin",
    imageUrl: "./images/berlin.webp",
    imageAlt: "Image of the Berlin arches",
    isLiked: false,
  },
  {
    title: "Nagoyan",
    imageUrl: "./images/nagoyan.webp",
    imageAlt: "Image of a cherry blosom near a temple in Nagoyan",
    isLiked: false,
  },
  {
    title: "Japan",
    imageUrl: "./images/japan.webp",
    imageAlt: "Image of downtown Tokyo Japan",
    isLiked: false,
  },
  {
    title: "Chichenitza",
    imageUrl: "./images/chichenitza.webp",
    imageAlt: "Image of main piramid at Chichenitza",
    isLiked: false,
  },
  {
    title: "CDMX",
    imageUrl: "./images/cdmx.webp",
    imageAlt: "Image of Bellas Artes palace in downtown Mexico city",
    isLiked: false,
  },
];

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit:disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__span-error_visible'
};

// Selectors only (no DOM elements)
export const selectors = {
  cardsSectionSelector: "#articles",
  popupProfileSelector: "#edit-profile-popup",
  popupPlaceSelector: "#add-place-popup",
  popupImageSelector: "#popup__img-zoom",
  editProfileBtnSelector: "#edit-profile-btn",
  addNewPlaceBtnSelector: ".nav__button-add",
  profileFormSelector: "#form-profile",
  addPlaceFormSelector: "#form-place",
  nameSelector: ".nav__name",
  descriptionSelector: ".nav__job-title"
};