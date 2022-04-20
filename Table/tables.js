/**
 *
 * @param {HTMLElement} element
 * @returns
 */

const tables = function (element, columns) {
  columns = ["Action", ...columns];
  /**
   *
   * @param {HTMLElement} type
   * @param {Array} numberCol
   */
  const row = function (type, numberCol) {
    let row = document.createElement("tr");
    let tagName = type.tagName.toLowerCase() == "tbody" ? "td" : "th";
    for (let index = 0; index < numberCol.length; index++) {
      const element = numberCol[index];
      let column = document.createElement(tagName);
      if (typeof element !== "string") {
        column.appendChild(element);
      } else {
        column.innerHTML = element;
      }

      row.appendChild(column);
    }
    type.appendChild(row);
    return row;
  };
  const wraper = (function () {
    let wraper = document.createElement("div");
    wraper.classList.add("table-wraper");

    element.parentNode.replaceChild(wraper, element);
    wraper.appendChild(element);
    return wraper;
  })();

  const thead = (function () {
    let thead = document.createElement("thead");
    element.appendChild(thead);
    row(thead, columns);

    return thead;
  })();

  const tbody = (function () {
    let tbody = document.createElement("tbody");
    element.appendChild(tbody);
    return tbody;
  })();

  const inputs = function (action) {
    let row = JSON.parse(JSON.stringify(columns));
    row[0] = action;

    for (let index = 1; index < row.length; index++) {
      const element = row[index];

      let input = document.createElement("input");
      input.setAttribute("placeholder", element);

      row[index] = input;
    }

    return row;
  };

  const addNew = function () {
    let button = document.createElement("button");
    button.innerText = "Add +";
    button.addEventListener("click", function (e) {
      button.disabled = true;
      let div = document.createElement("div");
      let saveButton = document.createElement("button");
      saveButton.innerText = "Save";
      saveButton.addEventListener("click", function (e) {
        let inputs = newRow.querySelectorAll("input");
        inputs.forEach((input) => {
          console.log(input.value);
        });
      });
      let cancelButton = document.createElement("button");
      cancelButton.innerText = "Cancel";
      cancelButton.addEventListener("click", (e) => {
        newRow.remove();
        button.disabled = false;
      });
      div.appendChild(saveButton);
      div.appendChild(cancelButton);
      let newRow = row(thead, inputs(div));
    });
    return button;
  };

  const formaInputsUnsearch = (function () {
    let searhInputs = inputs(addNew());
    row(thead, searhInputs);
    for (let index = 1; index < searhInputs.length; index++) {
      const input = searhInputs[index];
      input.placeholder = "Search: " + input.placeholder;
      input.addEventListener("keyup", function (e) {
        console.log(e.target.value);
      });
    }
  })();
};
