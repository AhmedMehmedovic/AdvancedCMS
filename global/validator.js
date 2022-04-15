"use strict";
const validator = {
  errors: [],

  rules: {
    maxLenght: function (
      value,
      request = 10,
      message = "Input must have max 10 caracters!"
    ) {
      if (value.length != request) {
        validator.errors.push(message);
        return false;
      }
      return true;
    },
    minLenght: function (
      value,
      request = 3,
      message = "Input must have min 3 caracters!"
    ) {
      if (value.length != request) {
        validator.errors.push(message);
        return false;
      }
      return true;
    },
    empty: function (value, message = "Input is required") {
      if (value == "") {
        validator.errors.push(message);
        return false;
      }
      return true;
    },
    match: function (
      value1,
      value2,
      message = value1 + "must be the same like " + value2
    ) {
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
};
