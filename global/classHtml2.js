"use strict";
if (!user.isLogged()) {
  location.href = "/HomePage/index.html";
}

/**
 * @param {HTMLElement}element
 * @returns {object}
 */

class HtmlTable {
  constructor(element, columns = []) {
    this.element = element;
    this.columns = ["Action"].concat(columns);

    this.wrapper = this.#createWrapper();
    this.thead = this.#crateTHead();
    this.tbody = this.#createTbody();

    this.#createRow(this.thead, this.columns, "thead");
    this.#searchInputs();
  }

  #createWrapper() {
    let wrapper = document.createElement("div");
    wrapper.classList.add("table-wrapper");
    this.element.parentNode.replaceChild(wrapper, this.element);
    wrapper.appendChild(this.element);
    return wrapper;
  }

  #crateTHead() {
    let thead = document.createElement("thead");
    this.element.appendChild(thead);
    return thead;
  }
  #createTbody() {
    let tbody = document.createElement("tbody");
    this.element.appendChild(tbody);
    return tbody;
  }

  #searchInputs() {
    let addButton = this.#createButton("+");
    let self = this;
    addButton.addEventListener("click", function (e) {
      self.#createFormNewData(e);
    });
    return this.#inputs(addButton, "Search");
  }

  #inputs(element, placeholder = "", values = []) {
    placeholder = placeholder == "" ? "" : placeholder + ": ";
    let inputs = [element];
    for (let index = 1; index < this.columns.length; index++) {
      const column = this.columns[index];
      let createdInput = document.createElement("input");
      createdInput.placeholder = placeholder + column;
      if (values[index - 1]) {
        createdInput.value = values[index - 1];
      }
      inputs.push(createdInput);
    }
    return this.#createRow(this.thead, inputs);
  }

  #createButton(innerButtonText) {
    let button = document.createElement("button");
    button.classList.add(`${innerButtonText}`);
    button.innerText = `${innerButtonText}`;
    return button;
  }

  #event(name, data) {
    const event = new CustomEvent("dt." + name, {
      detail: data,
    });
    this.element.dispatchEvent(event);
  }

  #newRow(values, id, element, place = "prepend") {
    let self = this;
    const edit = this.#createButton("Edit");
    edit.addEventListener("click", (e) => {
      let button = e.target;
      let rowId = row.dataset.id;
      let tds = row.querySelectorAll("td:not(:first-child)");
      for (const td of tds) {
        td.setAttribute("contenteditable", button.innerText === "Edit" ? true : false);
      }
      if (button.innerText === "Save") {
        self.#event("save", {
          id: rowId,
          values: Object.values(tds).map((el) => el.innerText),
        });
      }
      button.innerText = button.innerText === "Edit" ? "Save" : "Edit";
    });
    const remove = this.#createButton("Delete");
    remove.addEventListener("click", (e) => {
      this.#event("deleted" + element.tagName, {
        id: id ?? row.dataset.id,
        values: values,
      });
      row.remove();
    });
    const wrapper = document.createElement("div");
    wrapper.append(edit);
    wrapper.append(remove);
    const row = this.#createRow(element, [wrapper, ...values], id, place);
    this.#event("created" + element.tagName, {
      id: id ?? row.dataset.id,
      values: values,
    });
  }

  newBodyRow(values, id, place = "prepend") {
    return this.#newRow(values, id, this.tbody, place);
  }
  newHeadRow(values, id, place = "append") {
    return this.#newRow(values, id, this.thead, place);
  }

  #createFormNewData(event) {
    let self = this;
    let create = this.#createButton("Create");
    let cancel = this.#createButton("Cancel");

    cancel.addEventListener("click", (e) => {
      row.remove();
    });

    create.addEventListener("click", (e) => {
      let values = Object.values(row.querySelectorAll('input[placeholder^="Enter"]')).map((el) => el.value);
      self.newBodyRow(values);
      row.remove();
    });

    let wrapper = document.createElement("div");
    wrapper.append(create);
    wrapper.append(cancel);
    const row = this.#inputs(wrapper, "Enter");
  }
  /**
   *
   * @param {HTMLElement} element
   * @param {object} columns
   * @returns
   */
  #createRow(element, columns, id, place = "append") {
    let row = document.createElement("tr");
    row.dataset.id = id ? id : Date.now ? Date.now() : new Date().getTime();
    let type = element.tagName === "TBODY" ? "td" : "th";

    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      let typeElement = document.createElement(`${type}`);
      if (typeof column === "object") {
        typeElement.append(column);
      } else {
        typeElement.innerHTML = column;
      }
      row.append(typeElement);
    }
    if (place === "append") {
      element.append(row);
    } else {
      element.prepend(row);
    }
    return row;
  }

  loadData(rows, place = "prepend") {
    for (const [id, columns] of Object.entries(rows)) {
      this.newBodyRow(columns, id, place);
    }
  }
}

var t1;
document.addEventListener("DOMContentLoaded", (e) => {
  let randomData = [];

  for (let index = 0; index < 50; index++) {
    randomData[index] = ["Name", "Adress", "ID", "Phone", "Auto"].map((v) => v + index);
  }
  t1 = new AdvancedTable(example, ["Name", "Adress", "ID", "Phone", "Auto"], randomData);

  example.addEventListener("dt.save", (e) => {
    console.log("EDITED", e.detail);
  });

  example.addEventListener("dt.createdTBODY", (e) => {
    console.log("TBODY", e.detail);
  });
  example.addEventListener("dt.createdTHEAD", (e) => {
    console.log("THEAD", e.detail);
  });

  example.addEventListener("dt.deletedTBODY", (e) => {
    console.log("TBODY deleted", e.detail);
  });
  example.addEventListener("dt.deletedTHEAD", (e) => {
    console.log("THEAD deleted", e.detail);
  });
});

class AdvancedTable extends HtmlTable {
  #data;
  constructor(element, columns, data) {
    super(element, columns);
    this.#data = data; /// potrebno je prvo filtrirat prema pretrazi, sortirat, izracunat za paginate, prikazat sa loadData()

    this.loadData(this.#data);
  }
}
