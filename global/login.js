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

    modal: function () {
      return user.modal;
    },

    clickSubmit: function () {
      let button = login.inputs.submit;

      button.addEventListener("click", function (e) {
        e.preventDefault();
        let email = login.inputs.email.value;
        let password = login.inputs.password.value;
        user.email = email;
        user.password = password;
        user.update();
        let registerModal = modal(document.querySelector("div.modal-container"));
        registerModal.add(user.getErrors());

        registerModal.show();
        //user.register();
      });
    },
  };
  login.modal();
  login.clickSubmit();
});
