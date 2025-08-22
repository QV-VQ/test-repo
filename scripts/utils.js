// Utility functions for loading states
export function renderLoading(isLoading, button, initialText = 'Save', loadingText = 'Saving...') {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = initialText;
  }
}

// Escape key handler for popups
export function handleEscapeKey(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup-active');
    if (openPopup) {
      const popupInstance = openPopup._popupInstance;
      if (popupInstance && typeof popupInstance.close === 'function') {
        popupInstance.close();
      }
    }
  }
}