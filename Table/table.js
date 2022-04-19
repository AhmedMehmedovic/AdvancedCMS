let klik = function () {
  tables().createTable();
};

const tables = function () {
  return {
    createTable: function () {
      let table = document.createElement("table");
      let header = document.createElement("thead");
      let body = document.createElement("tbody");
      let th = document.createElement("th");

      header.appendChild(th);
      table.appendChild(header);
      table.appendChild(body);
      console.log(table);

      let tr = document.createElement("tr");
      let td = document.createElement("td");
      tr.appendChild(td);
      body.appendChild(tr);
      //return table;
    },
    editRow: function () {},

    deleteRow: function () {},
  };
};
