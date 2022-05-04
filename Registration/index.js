if (user.isLogged()) {
  location.href = "/Table/table.html";
}
document.addEventListener("DOMContentLoaded", function (e) {
  // if (user.isLogged()) {
  //   location.href = "/Table/table.html";
  // } else return false;

  const registerPage = {
    inputs: {
      email: document.querySelector(".body input[type='email']"),
      password: document.querySelector(".body input[type='password']"),
      retype: document.querySelector(".body input[name='re-type']"),
      firstName: document.querySelector(".body input[name='firstName']"),
      lastName: document.querySelector(".body input[name='lastName']"),
      button: document.querySelector(".body input[type='button']"),
    },
    signUp: function () {
      registerPage.inputs.button.addEventListener("click", function (e) {
        e.preventDefault();

        let email = registerPage.inputs.email.value;
        user.email = email;

        let password = registerPage.inputs.password.value;
        user.password = password;
        let registerModal = modal(document.querySelector("div.modal-container"));

        user.init(email, password);
        validator.inputs.password(password, registerPage.inputs.retype.value);
        validator.inputs.email(email);
        validator.inputs.name(registerPage.inputs.firstName.value);
        validator.inputs.name(registerPage.inputs.lastName.value);

        if (validator.errors.length > 0) {
          registerModal.add(validator.getErrors());
          registerModal.show();
          return false;
        }

        if (user.register()) {
          location.href = "/Table/table.html";
          storage.save();
          cookie.setItem("session", email);
        } else {
          registerModal.add(user.getErrors());
          registerModal.show();
          return false;
        }
      });
    },
  };

  registerPage.signUp();
  //registerPage.init();
});
