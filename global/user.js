"use strict";
const user = {
  errors: [],
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
    if (password !== passwordDb) {
      return false;
    }
    for (const [key, value] of Object.entries(this)) {
      if (key !== "errors") delete this[key];
    }

    for (const [key, value] of Object.entries(userData)) {
      this[key] = value;
    }
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
      console.log(this.getErrors(false));
      return false;
    }

    let userExist = storage.init(this.email);

    if (userExist) {
      throw Error("User is registered");
    }
    this.update();
    return true;
  },

  update: function () {
    let storageKey = this.email ?? undefined;
    if (storageKey === undefined) {
      throw Error("User is not exist");
    }
    storage.init(storageKey);
    if (typeof storage.data.user === "undefined") {
      storage.data.user = {};
    }
    for (const [key, value] of Object.entries(this)) {
      if (key !== "errors") storage.data.user[key] = value;
    }
    storage.save();
  },
};
