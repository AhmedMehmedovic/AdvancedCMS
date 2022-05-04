"use strict";
if (user.isLogged()) {
  location.href = "/Table/table.html";
}

document.addEventListener("DOMContentLoaded", function (e) {
  const login = {
    inputs: {
      email: document.querySelector('div.container div.body form input[type="email"]'),
      password: document.querySelector('div.container div.body form input[type="password"]'),
      submit: document.querySelector('div.container div.body form input[type="button"]'),
    },

    clickSubmit: function () {
      let button = login.inputs.submit;

      button.addEventListener("click", function (e) {
        e.preventDefault();
        let email = login.inputs.email.value;
        let password = login.inputs.password.value;
        user.email = email;
        user.password = password;

        let registerModal = modal(document.querySelector("div.modal-container"));

        validator.inputs.password(password);
        validator.inputs.email(email);
        if (validator.errors.length > 0) {
          registerModal.add(validator.getErrors());
          registerModal.show();
          return false;
        }

        if (user.init(email, password)) {
          cookie.setItem("session", email);
          location.href = "/Table/table.html";

          // storage.save();
        } else {
          registerModal.add(user.getErrors());
          registerModal.show();
        }
      });
    },
  };

  login.clickSubmit();
});
