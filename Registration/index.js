const ragisterPage = (function () {
  return {
    init: function () {
      let modalErrors = modal(document.querySelector("div.modal-container"));

      user.email = "a";
      user.password = "b";
      if (!user.register()) {
        console.error(user.errors);
        modalErrors.add(user.errors);
        modalErrors.show();
      }
    },
  };
})();

document.addEventListener("DOMContentLoaded", function (ev) {
  ragisterPage.init();
});
