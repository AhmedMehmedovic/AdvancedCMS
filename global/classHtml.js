"use strict";
if (!user.isLogged()) {
  location.href = "/HomePage/index.html";
}

/**
 * @param {HTMLElement}element
 * @returns {object}
 */

class Html {
  constructor(element, inputData = [], numberElement) {
    this.element = element;
    this.inputsData = inputData;
    this.numberElement = numberElement;
  }

  row(type, input = this.inputsData, inputCreate = false) {
    let row = document.createElement("tr");
    let tbodyExist = this.element.querySelector("tbody");

    if (type === "td") {
      this.tbody().appendChild(row);
    } else if (type === "th") {
      this.thead().appendChild(row);
    } else if (type === "") {
      let tbodyExist = this.element.querySelector("tbody");
      tbodyExist.appendChild(row);
    }
    if (tbodyExist) {
      type = "td";
    }

    for (let i = 0; i < input.length; i++) {
      const element = input[i];
      let column = document.createElement(`${type}`);
      let addBtn = this.element.querySelector("tbody tr td .Add");

      if (inputCreate) {
        let createdInput = document.createElement("input");
        if (element !== undefined) {
          createdInput.value = element;
        }

        if (i < 1 && addBtn !== null) {
          column.appendChild(this.createButton("Save"));
          column.appendChild(this.createButton("Delete"));
        }
        if (i < 1 && addBtn == null) {
          column.appendChild(this.createButton("Add"));
        }

        if (i > 0) {
          column.appendChild(createdInput);
        }
      } else {
        column.innerHTML = element;
      }

      row.append(column);
    }

    return row;
  }

  wraper() {
    let wraper = document.createElement("div");

    this.element.parentNode.replaceChild(wraper, this.element);
    wraper.appendChild(this.element);

    return wraper;
  }

  thead() {
    let thead = document.createElement("thead");
    this.element.appendChild(thead);
    return thead;
  }
  tbody() {
    let tbody = document.createElement("tbody");
    this.element.appendChild(tbody);
    return tbody;
  }
  createButton(innerButtonText) {
    let button = document.createElement("button");
    button.classList.add(`${innerButtonText}`);
    button.innerText = `${innerButtonText}`;

    return button;
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  let exampleElement = document.getElementById("example");

  let tabelaHtml = new Html(exampleElement);
  tabelaHtml.wraper();
  tabelaHtml.row("th", ["Action", "Name", "Adress", "ID", "Phone", "Auto"]);
  //tabelaHtml.row("td", [tabelaHtml.createButton("Add")], true);
  tabelaHtml.row("td", iterateThead(), true);

  let buttonAdd = exampleElement.querySelector(".Add");

  function iterateThead() {
    let dataTyped = exampleElement.querySelectorAll("table thead tr th");
    let dataInputed = [];
    for (const iterator of dataTyped) {
      dataInputed.push(iterator.value);
    }

    return dataInputed;
  }

  buttonAdd.addEventListener("click", (e) => {
    e.preventDefault();
    let numberCol = exampleElement.querySelectorAll("table thead tr th");
    let dataS = [];
    for (let i = 0; i < numberCol.length; i++) {
      let element = numberCol[i];
      element = "";
      dataS.push(element);
    }
    tabelaHtml.row("", dataS, true);

    buttonAdd.disabled = true;

    ///SAVE
    let buttonSave = exampleElement.querySelector(".Save");
    buttonSave.addEventListener("click", (e) => {
      e.preventDefault();
      let allInput = exampleElement.querySelectorAll("table tbody tr:nth-child(2) td input ");
      let rowValue = [];
      for (const iterator of allInput) {
        rowValue.push(iterator.value);
      }
      user.data.exampleElement = new Map();

      user.data.exampleElement[index] = rowValue;
      user.update();
      console.log(rowValue);
      buttonSave.replaceWith(tabelaHtml.createButton("Edit"));
      buttonSave.disabled = true;
      buttonAdd.disabled = false;
    });
  });

  //console.log(buttonAdd);
  //let selec = row1.querySelector("td input");
});
