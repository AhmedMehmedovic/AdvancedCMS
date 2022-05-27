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

    setTimeout(() => {
      this._event("ready", {
        table: this,
        element: this.element,
      });
    }, 50);
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

  searchMethod(values) {
    this._event("search", values);
    let rows = this.tbody.querySelectorAll("tr");

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const tds = row.querySelectorAll("td:not(:first-child)");
      let rowVisible = true;
      for (let tdi = 0; tdi < tds.length; tdi++) {
        const td = tds[tdi];
        const searchTerm = values[tdi];
        if (!td.innerText.includes(searchTerm) && searchTerm !== "") {
          rowVisible = false;
          break;
        }
      }
      row.style.display = rowVisible ? "" : "none";
    }
  }

  #searchInputs() {
    let addButton = this._createButton("+");
    let self = this;
    addButton.addEventListener("click", function (e) {
      self.#createFormNewData(e);
    });
    const row = this.#inputs(addButton, "Search");
    let inputs = row.querySelectorAll('input[placeholder^="Search"]');

    for (const input of inputs) {
      input.addEventListener("keyup", (e) => self.searchMethod(Object.values(inputs).map((el) => el.value)));
    }

    return row;
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

  _createButton(innerButtonText) {
    let button = document.createElement("button");
    button.classList.add(`${innerButtonText}`);
    button.innerText = `${innerButtonText}`;
    return button;
  }

  _event(name, data) {
    const event = new CustomEvent("dt." + name, {
      detail: data,
    });
    this.element.dispatchEvent(event);
  }

  #newRow(values, id, element, place = "prepend") {
    let self = this;
    const edit = this._createButton("Edit");
    edit.addEventListener("click", (e) => {
      let button = e.target;
      let rowId = row.dataset.id;
      let tds = row.querySelectorAll("td:not(:first-child)");
      for (const td of tds) {
        td.setAttribute("contenteditable", button.innerText === "Edit" ? true : false);
      }
      if (button.innerText === "Save") {
        self._event("save", {
          id: rowId,
          values: Object.values(tds).map((el) => el.innerText),
        });
      }
      button.innerText = button.innerText === "Edit" ? "Save" : "Edit";
    });
    const remove = this._createButton("Delete");
    remove.addEventListener("click", (e) => {
      this._event("deleted" + element.tagName, {
        id: id ?? row.dataset.id,
        values: values,
      });
      row.remove();
    });
    const wrapper = document.createElement("div");
    wrapper.append(edit);
    wrapper.append(remove);
    const row = this.#createRow(element, [wrapper, ...values], id, place);
    this._event("updated" + element.tagName, {
      id: id ?? row.dataset.id,
      values: values,
    });

    return row;
  }

  newBodyRow(values, id, place = "prepend") {
    return this.#newRow(values, id, this.tbody, place);
  }
  newHeadRow(values, id, place = "append") {
    return this.#newRow(values, id, this.thead, place);
  }

  #createFormNewData(event) {
    let self = this;
    let create = this._createButton("Create");
    let cancel = this._createButton("Cancel");

    cancel.addEventListener("click", (e) => {
      row.remove();
    });

    create.addEventListener("click", (e) => {
      const values = Object.values(row.querySelectorAll('input[placeholder^="Enter"]')).map((el) => el.value);
      const newRow = self.newBodyRow(values);
      self._event("created", {
        id: newRow.dataset.id,
        values: values,
      });
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

document.addEventListener("DOMContentLoaded", (e) => {
  /// generate demo data
  example.addEventListener("dt.ready", (e) => {
    let data = e.detail;
    console.log("READY", e.detail);
    const tableStorage = new TableStorage(data.table, data.element);
  });
  let randomData = [];

  for (let index = 0; index <= 20; index++) {
    randomData[index] = ["Name", "Adress", "ID", "Phone", "Auto"].map((v) => v + index);
  }

  var t1 = new AdvancedTable(example, ["Name", "Adress", "ID", "Phone", "Auto"], randomData);
});

class AdvancedTable extends HtmlTable {
  #data;
  #sortColumn = null;
  #sortDirection = "asc";
  #dataRender;
  #searchFilter = [];
  #lengthMenu;
  #pagination;
  #lengthMenuValue = 10;
  #currentPage = 1;
  constructor(element, columns, data) {
    super(element, columns);
    this.#lengthMenu = this.#createLengthMenu();

    this.#pagination = this.#createPaginate();
    this.#data = data; /// potrebno je prvo filtrirat prema pretrazi, sortirat, izracunat za paginate, prikazat sa loadData()
    this.#createSortRow();

    let self = this;
    ["dt.save", "dt.deletedTBODY", "dt.created", "dt.changeLengthMenu", "dt.currentPage", "dt.search"].forEach((evt) =>
      element.addEventListener(evt, function (e) {
        self.#renderContent();
      })
    );
  }

  #renderContent() {
    this.#dataRender = structuredClone(this.#data);
    this.#searchData(this.#searchFilter);
    this.#sortData();
    this.#paginateData();

    this.tbody.innerHTML = "";
    if (this.#dataRender.length === 0) {
      this.loadData([["No results"]]);
    } else {
      this.loadData(this.#dataRender);
    }
  }

  searchMethod(values) {
    this.#searchFilter = values;
    this._event("search", this.#searchFilter);
  }

  #searchData(values) {
    console.log(this.#dataRender);

    //this.#dataRender = this.#dataRender.splice(0, 19);
  }
  #sortData() {
    //this.#dataRender = this.#dataRender.splice(0, 18);
  }
  #paginateData() {
    //this.#dataRender = this.#dataRender.splice(0, 5);
  }

  #createSortRow() {
    let self = this;
    const thd = this.thead.querySelectorAll('tr[data-id="thead"] th:not(:first-child)');

    for (let i = 0; i < thd.length; i++) {
      const th = thd[i];
      const exitBtn = this._createButton("X");

      exitBtn.style.display = "none";
      exitBtn.addEventListener("click", function (e) {
        e.stopImmediatePropagation();
        exitBtn.style.display = "none";
        th.classList.remove("asc");
        th.classList.remove("desc");
      });

      th.appendChild(exitBtn);
      //  console.log(th);

      th.addEventListener("click", function (e) {
        const thd = self.thead.querySelectorAll('tr[data-id="thead"] th:not(:first-child)');

        for (const th of thd) {
          if (th.classList.contains("asc") || th.classList.contains("desc")) {
            th.classList.remove("asc");
            th.classList.remove("desc");
            th.querySelector("button").style.display = "none";
          }
        }

        if (self.#sortDirection === "asc" || self.#sortDirection === undefined) {
          th.classList.add("desc");
          th.classList.remove("asc");
          exitBtn.style.display = "inline";
          self.#sortDirection = "desc";
        } else if (self.#sortDirection === "desc") {
          th.classList.remove("desc");
          th.classList.add("asc");
          exitBtn.style.display = "inline";

          // self.#sortDirection = "asc";
        }
      });
    }
  }
  #createLengthMenu() {
    let self = this;
    const wrapper = document.createElement("div");
    const menu = document.createElement("select");
    const options = [10, 20, 30];

    for (const option of options) {
      menu.innerHTML += `<option value="${option}">${option}</option>`;
    }
    menu.addEventListener("change", (e) => {
      self.#lengthMenuValue = e.target.value;
      self._event("changeLengthMenu", { value: self.#lengthMenuValue });
    });

    wrapper.appendChild(menu);
    this.wrapper.append(wrapper);
  }
  #createPaginate() {
    let self = this;
    const wraper = document.createElement("div");
    const prevPage = this._createButton("Prev");
    const nextPage = this._createButton("Next");
    const currentPage = this._createButton(this.#currentPage);
    currentPage.disabled = true;
    self.element.addEventListener("dt.currentPage", (e) => {
      currentPage.innerText = e.detail.value;
      if (self.#currentPage > 1) {
        prevPage.disabled = false;
      }
    });
    prevPage.disabled = self.#currentPage == 1;
    prevPage.addEventListener("click", (e) => {
      if (self.#currentPage > 1) {
        self.#currentPage--;
      }
      e.target.disabled = self.#currentPage == 1; ///true false
      self._event("currentPage", { value: self.#currentPage });
    });

    nextPage.addEventListener("click", (e) => {
      self.#currentPage++;
      self._event("currentPage", { value: self.#currentPage });
    });
    wraper.appendChild(prevPage);
    wraper.appendChild(currentPage);
    wraper.appendChild(nextPage);
    this.wrapper.appendChild(wraper);
  }
}

class TableStorage {
  constructor(table, element) {
    this.table = table;
    this.element = element;
    this.load();
  }

  load() {
    this.element.addEventListener("dt.save", (e) => {
      console.log("EDITED", e.detail);
    });

    this.element.addEventListener("dt.deletedTBODY", (e) => {
      console.log("TBODY deleted", e.detail);
    });
    this.element.addEventListener("dt.created", (e) => {
      console.log("created", e.detail);
    });
    this.element.addEventListener("dt.changeLengthMenu", (e) => {
      console.log("changeLengthMenu", e.detail);
    });
    this.element.addEventListener("dt.currentPage", (e) => {
      console.log("currentPage", e.detail);
    });
  }
}
