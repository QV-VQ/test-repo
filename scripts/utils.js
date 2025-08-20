// Utility functions
export function escapeEventController(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup-active');
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}

export function openModal(modal) {
  modal.classList.remove('popup_hidden');
  modal.classList.add('popup-active');
  document.addEventListener('keydown', escapeEventController);
}

export function closeModal(modal) {
  modal.classList.add('popup_hidden');
  modal.classList.remove('popup-active');
  document.removeEventListener('keydown', escapeEventController);
}

export function renderLoading(isLoading, button, initialText = 'Save', loadingText = 'Saving...') {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = initialText;
  }
}
