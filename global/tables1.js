/**
 *
 * @param {HTMLElement} element
 * @returns
 */

class Table {
  constructor(element, columns, pagination) {
    this.element = element;
    this.columns = columns;
    this.pagination = pagination;
  }

  createRow(type, numberOfColumn) {
    this.type = type;
    this.numberOfColumn = numberOfColumn;

    let row = document.createElement("tr");
    let tagName = this.type.tagName.tolowerCase() == "tbody" ? "td" : "th";

    for (let i = 0; i < this.numberOfColumn.length; i++) {
      const element = this.numberOfColumn[i];
      let column = document.createElement(tagName);
      if (typeof element !== "string") {
        column.appendChild(element);
      } else {
        column.innerHTML = element;
      }
      row.appendChild(column);
    }
    this.type.appendChild(row);

    return row;
  }

  wrapper() {
    let wraper = document.createElement("div");
    wraper.classList.add("table-wraper");

    this.element.parentNode.replaceChild(wraper, this.element);
    wraper.appendChild(this.element);
    return wraper;
  }

  thead() {
    let thead = document.createElement("thead");
    this.element.appendChild(thead);
    this.createRow(thead, this.columns);
    return thead;
  }
  tbody() {
    let tbody = document.createElement("tbody");
    this.element.appendChild(tbody);
    return tbody;
  }
}
