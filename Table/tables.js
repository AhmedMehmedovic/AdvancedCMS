/**
 *
 * @param {HTMLElement} element
 * @returns
 */

//const { userInfo } = require("os");

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
      // After click add button disable button and searchinput
      button.disabled = true;
      let searchRowEditable = element.querySelectorAll("div.table-wraper table thead tr:nth-child(2) th:not(:first-child) input");

      for (let index = 0; index < searchRowEditable.length; index++) {
        const element = searchRowEditable[index];
        element.disabled = true;
      }

      // Create div for buttons
      let div = document.createElement("div");

      // Save button in action
      let saveButton = document.createElement("button");
      saveButton.innerText = "Save";

      saveButton.addEventListener("click", function (e) {
        // Taking all elements from newrow
        let inputColumn = newRow.querySelectorAll("input");
        let newInputs = [];
        inputColumn.forEach((input) => {
          newInputs.push(input.value);
        });

        let div = document.createElement("div");

        ///Delete button

        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", (e) => {
          newRowData.remove();
        });

        ///Edit button

        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.addEventListener("click", (e) => {
          let tds = newRowData.querySelectorAll("td:not(:first-child)");

          for (let index = 0; index < tds.length; index++) {
            const element = tds[index];

            let editInput = document.createElement("input");
            editInput.value = element.innerText;

            element.innerHTML = "";
            element.appendChild(editInput);
          }

          let updateButton = document.createElement("button");
          updateButton.innerText = "Update";
          updateButton.addEventListener("click", function (e) {
            let tdsUpdate = newRowData.querySelectorAll("td:not(:first-child)");

            for (let index = 0; index < tdsUpdate.length; index++) {
              const element = tdsUpdate[index];
              const input = element.querySelector("input");
              element.innerHTML = input.value;
            }
            updateButton.replaceWith(editButton);
          });
          editButton.replaceWith(updateButton);
        });

        div.appendChild(editButton);

        div.appendChild(deleteButton);

        let newRowData = row(tbody, [div, ...newInputs]);

        newRow.remove();
        button.disabled = false;
      });

      // Cancel button in action

      let cancelButton = document.createElement("button");
      cancelButton.innerText = "Cancel";
      cancelButton.addEventListener("click", (e) => {
        newRow.remove();
        button.disabled = false;
      });

      // Action buttons
      div.appendChild(saveButton);
      div.appendChild(cancelButton);

      // New row create with action buttons
      let newRow = row(thead, inputs(div));
    });
    return button;
  };

  const formaInputsUnsearch = (function () {
    let searhInputs = inputs(addNew());
    // console.log(searhInputs);
    row(thead, searhInputs);
    for (let index = 1; index < searhInputs.length; index++) {
      const input = searhInputs[index];
      input.placeholder = "Search: " + input.placeholder;
      input.addEventListener("keyup", function (e) {
        //console.log(e.target.value);
      });
    }
  })();
};
