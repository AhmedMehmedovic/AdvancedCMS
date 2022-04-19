const ragisterPage = (function () {
  return {
    init: function () {
      let modalErrors = modal(document.querySelector("div.modal-container"));

      if (!user.register()) {
        modalErrors.add(user.errors);
        modalErrors.show();
      }
    },
  };
})();

document.addEventListener("DOMContentLoaded", function (e) {
  ragisterPage.init();
});

const registration = {
  inputs: {
    email: document.querySelector(".body input[type='email']"),
    password: document.querySelector(".body input[type='password']"),
    retype: document.querySelector(".body input[name='re-type']"),
    firstName: document.querySelector(".body input[type='firstName']"),
    lastName: document.querySelector(".body input[type='lastName']"),
  },
  signUp: function () {},
};
