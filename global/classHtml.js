"use strict";
if (!user.isLogged()) {
  location.href = "/HomePage/index.html";
}

/**
 * @param {HTMLElement}element
 * @returns {object}
 */

class Html {
  constructor(element, inputData = [], inputCreate = false, innerButtonText, type) {
    this.element = element;
    this.inputsData = inputData;
    this.inputCreate = inputCreate;
    this.innerButtonText = innerButtonText;
    this.type = type;
  }

  row(type, input = this.inputsData, inputCreate = this.inputCreate) {
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
          column.appendChild(this.createButton("Cancel"));
        }

        if (i < 1 && addBtn == null) {
          let addBtn = this.createButton("Add");
          addBtn.addEventListener("click", (e) => {
            alert("test");
          });
          column.appendChild(addBtn);
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
  createButton(innerButtonText = this.innerButtonText) {
    let button = document.createElement("button");

    button.classList.add(`${innerButtonText}`);
    button.innerText = `${innerButtonText}`;
    return button;
  }
}

class CreateTabele extends Html {
  constructor(element, inputData, inputCreate, innerButtonText, tableName) {
    super(element, inputData, inputCreate, innerButtonText);
    this.inputcreate = inputCreate;
    this.tableName = tableName;
    this.idTable = element;
  }

  createTab() {
    this.tableName = new Html(this.idTable);
    this.tableName.wraper();
    this.tableName.row("th", this.inputsData);
    this.tableName.row("td", this.inputsData, (this.inputcreate = true));
  }
  addRow() {
    this.tableName.row("", this.inputsData, (this.inputcreate = true));
  }
  deleteRow() {
    console.log(this.tableName.element.querySelector("tbody tr "));
  }

  buttonAdd() {
    //let table = this.tableName.element;
    let btnAdd = this.tableName.element.querySelector("tbody tr td button");

    btnAdd.addEventListener("click", (e) => {
      e.preventDefault();
      this.addRow();
      // console.log(this.tableName.element.querySelector("tbody tr:nth-child(2)  "));

      btnAdd.disabled = true;
    });
  }
  buttonSave() {
    let btnSave = this.tableName.element.querySelector("tbody tr:nth-child(2)  ");
    console.log(btnSave);
    if (btnSave !== null) {
      btnSave.addEventListener("click", (e) => {
        //   e.preventDefault();
        console.log(e.target);
        //   this.addRow();
        //   console.log(this.tableName.element.querySelector("tbody tr:nth-child(2) td button "));

        //   btnAdd.disabled = true;
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  let t1 = new CreateTabele(example, ["Name", "Adress", "ID", "Phone", "Auto"], true);
  t1.createTab();
  t1.buttonAdd();
  t1.buttonSave();
  //t1.deleteRow();

  let t2 = new CreateTabele(example1, ["Action", "Name", "Adress", "ID", "Phone", "Auto"], true, "ameltab");
  t2.createTab();
  t2.buttonAdd();

  let t3 = new CreateTabele(example2, ["Action", "Name", "Adress", "ID", "Phone", "Auto"], true, "ameltab");
  t3.createTab();
  t3.buttonAdd();
});

// document.addEventListener("DOMContentLoaded", (e) => {
//   let exampleElement = document.getElementById("example");

//   let tabelaHtml = new Html(exampleElement);
//   tabelaHtml.wraper();
//   tabelaHtml.row("th", ["Action", "Name", "Adress", "ID", "Phone", "Auto"]);
//   tabelaHtml.row("td", iterateThead(), true);

//   let buttonAdd = exampleElement.querySelector(".Add");
//   let rowAdd;
//   function iterateThead() {
//     let dataTyped = exampleElement.querySelectorAll("table thead tr th");
//     let dataInputed = [];
//     for (const iterator of dataTyped) {
//       dataInputed.push(iterator.value);
//     }

//     return dataInputed;
//   }
//   function elementRemove(e) {
//     e.remove();
//   }

//   buttonAdd.addEventListener("click", (e) => {
//     e.preventDefault();

//     let numberCol = exampleElement.querySelectorAll("table thead tr th");
//     let dataS = [];
//     for (let i = 0; i < numberCol.length; i++) {
//       let element = numberCol[i];
//       element = "";
//       dataS.push(element);
//     }
//     rowAdd = tabelaHtml.row("", dataS, true);

//     buttonAdd.disabled = true;

//     ///SAVE

//     let buttonSave = exampleElement.querySelector(".Save");
//     buttonSave.addEventListener("click", (e) => {
//       e.preventDefault();
//       //console.log(e.target);
//       let allInput = exampleElement.querySelectorAll("table tbody tr:nth-child(2) td input ");
//       let rowValue = [];
//       for (const iterator of allInput) {
//         rowValue.push(iterator.value);
//       }

//       user.data.element = Object.values(rowValue);

//       // console.log(user.data.element);
//       user.update();
//       buttonSave.replaceWith(tabelaHtml.createButton("Edit"));
//       buttonSave.disabled = true;
//       buttonAdd.disabled = false;
//     });

//     // DELETE
//     let buttonDel = exampleElement.querySelector(".Delete");

//     buttonDel.addEventListener("click", function (e) {
//       e.preventDefault();
//       // console.log(e.target);
//       rowAdd.remove();

//       elementRemove(allInput);
//       buttonAdd.disabled = false;

//       //allInput.removeChild(allInput);
//       // console.log(allInput);
//     });
//   });

//   //console.log(buttonAdd);
//   //let selec = row1.querySelector("td input");
// });
