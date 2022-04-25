const registerPage = (function () {
  let inputs = {};

  let signUp = function () {
    inputs.button.addEventListener("click", function (e) {
      e.preventDefault();
      user.email = inputs.email.value;
      user.password = inputs.password.value;
      if (!user.register()) {
        let registerModal = modal(document.querySelector("div.modal-container"));
        registerModal.add(user.getErrors());
        user.errors = [];
        registerModal.show();
      }
    });
  };

  return {
    init: function () {
      inputs = {
        email: document.querySelector(".body input[type='email']"),
        password: document.querySelector(".body input[type='password']"),
        retype: document.querySelector(".body input[name='re-type']"),
        firstName: document.querySelector(".body input[type='firstName']"),
        lastName: document.querySelector(".body input[type='lastName']"),
        button: document.querySelector(".body input[type='button']"),
      };
      signUp();
    },
  };
})();

document.addEventListener("DOMContentLoaded", function (e) {
  if (user.isLogged()) {
    location.href = "/Table/table.html";
  }
  registerPage.init();
});
