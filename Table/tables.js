/*
user.init("amel@amell.ba", "123l");
user.testnaVarijabla = true;
user.update();
*/
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

  // Editable search input when adding new
  const editable = function (element, value) {
    let inputFields = element;
    for (let index = 0; index < inputFields.length; index++) {
      const element = inputFields[index];
      if (value === "OFF") {
        element.disabled = true;
      } else {
        element.disabled = false;
      }
    }
  };

  const addNew = function () {
    let button = document.createElement("button");
    button.innerText = "Add +";
    button.addEventListener("click", function (e) {
      // After click add button disable button and searchinput
      button.disabled = true;
      let searchRowEditable = element.querySelectorAll("div.table-wraper table thead tr:nth-child(2) th:not(:first-child) input");
      editable(searchRowEditable, "OFF");

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
            button.disabled = false;
          });
          editButton.replaceWith(updateButton);

          button.disabled = true;
        });

        div.appendChild(editButton);

        div.appendChild(deleteButton);

        let newRowData = row(tbody, [div, ...newInputs]);

        console.log(newRowData);

        //rowsTable.reverse();
        // console.log(rowsTable);

        newRow.remove();
        button.disabled = false;
        editable(searchRowEditable);
      });

      // Cancel button in action

      let cancelButton = document.createElement("button");
      cancelButton.innerText = "Cancel";
      cancelButton.addEventListener("click", (e) => {
        newRow.remove();
        button.disabled = false;
        editable(searchRowEditable);
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

  const logOut = (function (e) {
    let logOutBtn = document.querySelector("div.container div.header button");
    logOutBtn.addEventListener("click", function (e) {
      alert("test");
      cookie.removeItem("session");
      location.href = "/HomePage/index.html";
    });
    console.log(logOutBtn);
  })();
};
