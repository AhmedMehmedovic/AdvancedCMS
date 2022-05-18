/**
 * @param {HTMLElement}element
 * @returns {object}
 */

class Html {
  constructor(element, inputData, numberElement) {
    this.element = element;
    this.inputsData = inputData;
    this.numberElement = numberElement;
  }

  row(type) {
    let row = document.createElement(`${type}`);
    this.wraper();

    for (let i = 0; i < this.inputsData.length; i++) {
      const element = this.inputsData[i];
    }
    if (type === "td") {
      this.tbody().appendChild(row);
    } else if (type === "th") {
      this.thead().appendChild(row);
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
}

document.addEventListener("DOMContentLoaded", (e) => {
  let exampleElement = document.getElementById("example");

  let tabelaHtml = new Html(exampleElement);
  tabelaHtml.wraper();
  tabelaHtml.row("th");
  tabelaHtml.row("td");
});
