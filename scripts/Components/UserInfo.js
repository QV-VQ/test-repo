export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent
    };
  }

  setUserInfo({ name, description }) {
    if (name) this._nameElement.textContent = name;
    if (description) this._descriptionElement.textContent = description;
    
    // Save to local storage
    if (name) localStorage.setItem('name', name);
    if (description) localStorage.setItem('description', description);
  }
}