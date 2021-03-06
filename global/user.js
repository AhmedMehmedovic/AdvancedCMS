"use strict";
const user = {
  errors: [],
  data: {},
  modal: document.getElementsByClassName("modal-container")[0],

  getErrors: function (restart = true) {
    let tempErrors = [this.errors, ...validator.getErrors(restart)];
    if (restart) this.errors = [];
    return tempErrors;
  },

  init: function (email, password) {
    storage.init(email);
    let userData = storage.data.user ?? {};
    let passwordDb = userData.password ?? undefined;
    if (email !== userData.email) {
      user.errors.push("Email is not exist, please sign up!");
      return false;
    }

    if (password !== passwordDb) {
      user.errors.push("Password is incorect!");

      return false;
    }
    for (const [key, value] of Object.entries(this)) {
      if (key !== "errors") delete this[key];
    }

    for (const [key, value] of Object.entries(userData)) {
      this[key] = value;
    }
    return true;
  },

  register: function () {
    let requiredList = ["email", "password"];
    requiredList.forEach((prop) => {
      if (typeof this[prop] === "undefined") {
        throw Error(prop + " is required");
      }
    });

    validator.inputs.password(this.password);
    validator.inputs.email(this.email);
    if (validator.errors.length > 0) {
      modal(document.getElementsByClassName("modal-container")[0]).add(this.getErrors());
      modal(document.getElementsByClassName("modal-container")[0]).show();
      return false;
    }

    let userExist = storage.init(this.email);

    if (userExist) {
      modal(document.getElementsByClassName("modal-container")[0]).add("User is registered, please sign in!");
      modal(document.getElementsByClassName("modal-container")[0]).show();

      return false;
    }
    this.update();
    location.reload();
    return true;
  },

  update: function () {
    let storageKey = this.email ?? undefined;

    if (storageKey === undefined) {
      throw Error("User is not exist");
      //user.errors.push("User is not exist!");
    }
    storage.init(storageKey);
    if (typeof storage.data.user === "undefined") {
      storage.data.user = {};
    }
    for (const [key, value] of Object.entries(this)) {
      if (key !== "errors") storage.data.user[key] = value;
    }
    storage.save();
    //cookie.setItem("session", this.email);
  },
  isLogged: function () {
    let session = cookie.getItem("session");

    storage.init(session);
    let userData = storage.data.user ?? {};

    if (session !== userData.email) {
      return false;
    }

    for (const [key, value] of Object.entries(userData)) {
      this[key] = value;
    }
    return true;
  },
};
