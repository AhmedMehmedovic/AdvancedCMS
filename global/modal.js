"use strict";
/**
 *
 * @param {HTMLElement} element
 * @returns {object}
 */

const modal = function (element) {
  if (element == null) throw Error("Nema elementa za modal!");

  let close = function () {
    let list = element.querySelector(".body ul");

    list.innerHTML = "";
    element.classList.remove("show");
  };

  let backgroundClose = (function (e) {
    let back = document.querySelector("div.modal-container");
    back.addEventListener("click", function (e) {
      close();
    });
  })();

  let buttonClose = (function () {
    let button = element.querySelector(".header button.close");

    if (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        close();
      });
    }
  })();

  return {
    add: function (messages) {
      let body = element.querySelector("div.body ul");
      if (typeof messages !== "object") messages = [messages];

      messages.forEach((message) => {
        let li = document.createElement("li");
        li.innerHTML = message;
        body.appendChild(li);
      });
    },
    show: function () {
      element.classList.add("show");
    },
  };
};
