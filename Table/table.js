if (!user.isLogged()) {
  location.href = "/HomePage/index.html";
}

document.addEventListener("DOMContentLoaded", (e) => {
  tablePage.domLoaded();
});
const tablePage = (function () {
  const logOut = function () {
    let logOutBtn = document.querySelector("div.container div.header button");
    logOutBtn.addEventListener("click", function (e) {
      if (confirm("Do you want log out?")) {
        cookie.removeItem("session");

        location.href = "/HomePage/index.html";
      } else {
        return false;
      }
    });
  };

  return {
    domLoaded: function () {
      logOut();
    },
  };
})();
