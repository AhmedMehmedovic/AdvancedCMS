"use strict";

document.addEventListener("DOMContentLoaded", function (e) {
  if (user.isLogged()) {
    location.href = "/Table/table.html";
  }
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

        //user.init(email, password)
        // user.init(email, password);

        // storage.init(email);
        //user.register();
        let registerModal = modal(document.querySelector("div.modal-container"));
        // const userExist = user.init(email, password);
        validator.inputs.password(password);
        validator.inputs.email(email);
        if (validator.errors.length > 0) {
          registerModal.add(validator.getErrors());
          registerModal.show();
          return false;
        }

        if (user.init(email, password)) {
          location.href = "/Table/table.html";
          storage.save();
          cookie.setItem("session", email);
        } else {
          registerModal.add(user.getErrors());
          registerModal.show();
        }
        //location.href = "/Table/table.html";
        // if (!userExist) {
        //registerModal.add(user.errors);
        //registerModal.show();
        // }
        //registerModal.show();
      });
    },
  };

  login.clickSubmit();
});
