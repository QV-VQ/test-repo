import { config } from "./data.js";

function saveDetails(details) {
  details.name ? localStorage.setItem("name", details.name) : "";
  details.description ? localStorage.setItem("description", details.description) : "";
}

export function updateDetails() {
  const navName = document.querySelector(".nav__name");
  const navDescription = document.querySelector(".nav__job-title");

  const savedName = localStorage.getItem("name");
  const savedDescription = localStorage.getItem("description");

  navName.textContent = savedName ?? "Jane doe";
  navDescription.textContent = savedDescription ?? "Edit profile to add a description";
}

export function toggleModal(popup) {
  const isHidden = popup.classList.contains(config.popupIsHiddenClass);

  if (isHidden) {
    popup.classList.remove(config.popupIsHiddenClass);
    popup.classList.add(config.popupIsVisibleClass);
    document.addEventListener("keydown", escapeEventController);
  } else {
    popup.classList.add(config.popupIsHiddenClass);
    popup.classList.remove(config.popupIsVisibleClass);
    popup.querySelector(".popup__form")?.reset();
    document.removeEventListener("keydown", escapeEventController);
  }
}

export function manageModals(e, aside) {
  const target = e.target;

  const isProfileModalElement = config.editProfileBtnElement === target || config.formDetailsCloseBtn === target;
  const isPlaceModalElement = config.addNewPlaceBtn === target || config.addPlaceCloseBtn === target;
  const isImgCloseButton = config.imgPopupClose === target;
  const isModal = aside === target;

  if (isProfileModalElement) {
    toggleModal(config.profilePopupElement);
  }
  if (isPlaceModalElement) {
    toggleModal(config.addPlacePopup);
  }
  if (isImgCloseButton) {
    toggleModal(config.imgPopup);
  }
  if (isModal) {
    toggleModal(aside);
  }
}

export function controlProfileForm(e) {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();

  const formInputName = e.target.querySelector("#popup-input-name");
  const formInputDescription = e.target.querySelector("#popup-input-description");
  const details = {
    name: "",
    description: "",
  };

  details.name = formInputName.value;
  details.description = formInputDescription.value;
  saveDetails(details);
  updateDetails();
  toggleModal(e.target.parentElement);
}

function openImgPopup(imgSrc, imgAlt) {
  config.imgZoom.alt = imgAlt;
  config.imgZoom.title = imgAlt;
  config.imgZoom.src = imgSrc;
  config.figCaption.innerText = imgAlt;

  toggleModal(config.imgPopup);
}

export function manageCardController(e) {
  const pointClicked = e.target;

  const isLikeIconClicked = pointClicked.classList[0].includes("like");

  if (isLikeIconClicked) {
    const isLikedIcon = "true" === pointClicked.getAttribute("data-isliked");

    if (isLikedIcon) {
      pointClicked.src = "./images/heart.svg";
      pointClicked.setAttribute("data-isLiked", "false");
    } else {
      pointClicked.src = "./images/heart-liked.svg";
      pointClicked.setAttribute("data-isLiked", "true");
    }
  } else if (pointClicked.classList[0].includes("delete")) {
    pointClicked.parentElement.remove();
  } else if (pointClicked.classList[0].includes("image")) {
    const picContainer = document.querySelector(".popup__zoom-container");

    const isHorizontal = pointClicked.dataset.orientation === "horizontal";
    const isVertical = pointClicked.dataset.orientation === "vertical";
    const isLargeScroll = document.documentElement.scrollWidth > 900;
    const isSmallHeight = window.screen.availHeight <= 800;

    if (isHorizontal && isLargeScroll) {
      picContainer.style.width = "816px";
      picContainer.style.height = "auto";
    } else if (isVertical && isSmallHeight) {
      picContainer.style.width = "262px";
    } else if (isVertical && isLargeScroll) {
      picContainer.style.width = "433px";
    }
    openImgPopup(pointClicked.src, pointClicked.alt);
  }
}

export function escapeEventController(e) {
  e.stopImmediatePropagation();
  e.stopPropagation();

  config.popups.forEach((popup) => {
    const isEscapeKey = e.key === "Escape";
    const isActivePopup = popup.classList.contains("popup-active");
    const isImgPopup = popup.id === "popup__img-zoom";
    const hasForm = popup.firstElementChild.classList.contains("popup__form");

    if (isEscapeKey && isActivePopup && hasForm) {
      toggleModal(popup);
    } else if (isEscapeKey && isActivePopup && isImgPopup) {
      toggleModal(popup);
    }
  });
}
