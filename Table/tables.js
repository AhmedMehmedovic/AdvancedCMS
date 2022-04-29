/*
user.init("amel@amell.ba", "123l");
user.testnaVarijabla = true;
user.update();
*/
document.addEventListener("DOMContentLoaded", function (e) {
  if (!user.isLogged()) {
    location.href = "/HomePage/index.html";
  } else return false;
  contentLoadedStorage();
  //paginationCreate();
  //let tabela3 = tables(document.getElementById("tabela3"), storage.data.inputs);
});

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
  const paginationCreate = function () {
    let bodyTable = document.querySelector("div.container div.body div.table-wraper");
    let select = document.createElement("select");
    select.setAttribute("name", "pagination");

    let selectOpt1 = document.createElement("option");
    let selectOpt2 = document.createElement("option");
    let selectOpt3 = document.createElement("option");

    selectOpt1.value = 10;
    selectOpt2.value = 20;
    selectOpt3.value = 30;

    selectOpt1.innerText = 10;
    selectOpt2.innerText = 20;
    selectOpt3.innerText = 30;
    select.appendChild(selectOpt1);
    select.appendChild(selectOpt2);
    select.appendChild(selectOpt3);

    bodyTable.prepend(select);
  };
  const wraper = (function () {
    let wraper = document.createElement("div");
    wraper.classList.add("table-wraper");

    element.parentNode.replaceChild(wraper, element);
    wraper.appendChild(element);
    paginationCreate();
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

  const addNew = function (inputsStorage) {
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
      storage.data.inputs = [];

      saveButton.addEventListener("click", function (e) {
        // Taking all elements from newrow
        let inputColumn = newRow.querySelectorAll("input");
        let newInputs = inputsStorage ?? [];
        inputColumn.forEach((input) => {
          newInputs.push(input.value);
        });

        //////

        // Add to input in storage
        storage.key = cookie.getItem("session");
        storage.init(storage.key);

        if (storage.data[element.id] == undefined) {
          storage.data[element.id] = [];
        }
        storage.data[element.id].push(newInputs);
        storage.save();
        ///

        let div = document.createElement("div");

        ///Delete button

        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", (e) => {
          storage.data[element.id].splice([newRowData.rowIndex - 2], 1);
          storage.save();
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

            newInputs = [];

            for (let index = 0; index < tdsUpdate.length; index++) {
              const element = tdsUpdate[index];
              const input = element.querySelector("input");
              element.innerHTML = input.value;

              newInputs.push(input.value);
            }
            storage.data[element.id][newRowData.rowIndex - 2] = newInputs;
            storage.save();
            updateButton.replaceWith(editButton);
            button.disabled = false;
          });
          editButton.replaceWith(updateButton);

          button.disabled = true;
        });

        div.appendChild(editButton);

        div.appendChild(deleteButton);

        let newRowData = row(tbody, [div, ...newInputs]);

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
    row(thead, searhInputs);
    for (let index = 1; index < searhInputs.length; index++) {
      const input = searhInputs[index];
      input.placeholder = "Search: " + input.placeholder;
      input.addEventListener("keyup", function (e) {
        console.log(e.target.value);
      });
    }
  })();

  const logOut = (function (e) {
    let logOutBtn = document.querySelector("div.container div.header button");
    logOutBtn.addEventListener("click", function (e) {
      if (confirm("Do you want log out?")) {
        cookie.removeItem("session");

        location.href = "/HomePage/index.html";
      } else {
        return false;
      }
    });
  })();
  const returnHome = (function () {
    let returnBtn = document.querySelector("div.container div.footer a");

    returnBtn.addEventListener("click", function (e) {
      if (user.isLogged()) {
        location.href = "/Table/table.html";
      }
    });
  })();

  const contentLoadedStorage = (function () {
    storage.key = cookie.getItem("session");
    storage.init(storage.key);

    let contentStorage = storage.data[element.id];

    for (let index = 0; index < contentStorage.length; index++) {
      const element = contentStorage[index];

      addNew(element);

      console.log(element);
    }
  })();
};
