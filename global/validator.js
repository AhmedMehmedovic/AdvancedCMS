"use strict";
const validator = {
  errors: [],

  rules: {
    maxLenght: function (value, request = 10, message = "Input must have max 10 caracters!") {
      if (value.length != request) {
        validator.errors.push(message);
        return false;
      }
      return true;
    },
    minLenght: function (value, request = 3, message = "Input must have min 3 caracters!") {
      if (value.length != request) {
        validator.errors.push(message);
        return false;
      }
      return true;
    },
    empty: function (value, message = value + "is required!") {
      if (value == "") {
        validator.errors.push(message);
        return false;
      }
      return true;
    },
    match: function (value1, value2, message = value1 + "must be the same like " + value2) {
      if (value1.value !== value2.value) {
        validator.errors.push(message);
        return false;
      }
      return true;
    },
    includes: function (value, request, message) {
      if (!value.value.includes(request)) {
        validator.errors.push(message);
        return false;
      }
      return true;
    },
  },

  inputs: {
    email: function (email) {
      validator.rules.empty(email, "Email is required !");
      validator.rules.includes(email, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email isn't in regular format : email@example.xxx !");
    },

    password: function (password, currentPassword) {
      validator.rules.empty(password);
      validator.rules.includes(password, /[A-Za-z]/, "Password must have a letter from A-z!");
      validator.rules.includes(password, /\d/, "Password must have number!");
      validator.rules.minLenght(password, 4, "Password must have min 4 caracters!");
      validator.rules.maxLenght(password, 8, "Password must have max 8 caracters!");
      if (currentPassword.value != "") {
        validator.rules.match(password, currentPassword);
        return false;
      }
      return true;
    },

    name: function (value) {
      validator.rules.minLenght(value);
      validator.rules.maxLenght(value, 15, "Name must have max 15 caracters!");
      return true;
    },

    phone: function (value) {
      validator.rules.includes(value, /^(\+)+[\d]{1,14}$/, "Phone number must be in format: +...!");
      validator.rules.maxLenght(value, 15, "Phone must have max 15 caracters!");
      return true;
    },
  },
};
