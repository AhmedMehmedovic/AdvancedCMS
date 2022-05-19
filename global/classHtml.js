"use strict";
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

    if (type === "td") {
      this.tbody().appendChild(row);
    } else if (type === "th") {
      this.thead().appendChild(row);
    }

    for (let i = 0; i < input.length; i++) {
      const element = input[i];
      let column = document.createElement(`${type}`);

      // input[0] = this.createButton("add");
      // row.appendChild(input[0]);
      if (inputCreate) {
        let createdInput = document.createElement("input");
        // inputCreate.setAttribute("placeholder", element);

        createdInput.value = element;
        // inputCreate.appendChild(this.createButton());

        column.appendChild(createdInput);
      } else {
        column.innerHTML = element;
      }

      //   if (inputCreate) {
      //     this.createInput(element, column);
      //   } else {
      //     column.innerHTML = element;
      //   }
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

  createInput(element, column) {
    let createdInput = document.createElement("input");
    createdInput.value = element;

    column.appendChild(createdInput);
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  let exampleElement = document.getElementById("example");

  let tabelaHtml = new Html(exampleElement);
  tabelaHtml.wraper();
  tabelaHtml.row("th", ["Action", "Name", "Adress", "ID", "Phone"]);
  tabelaHtml.row("td", [1, 23, 22, 21], true);
  // console.log(row1.querySelector("td input"));
  //let selec = row1.querySelector("td input");
  // tabelaHtml.row("td", [tabelaHtml.createButton("Add", selec), [23, 22, 21, 50]], true);

  //let row1 = tabelaHtml.row("td", [23, 22, 21, 50], true);

  //let dataIN = row1.querySelectorAll("td");
  //console.log(dataIN);
});
