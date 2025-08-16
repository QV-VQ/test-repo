export default class UserInfor {
  constructor({ name, description }) {
    this._userName = name;
    this._description = description;
  }

  getUserInfo() {
    return { name: this._userName, job: this._description };
  }

  setUserInfo() {
    // converts the new user's data and adds it to the page.
  }
}
