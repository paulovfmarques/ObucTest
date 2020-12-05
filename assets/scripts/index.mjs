import {
  renderFromStorage,
  renderAfterInsert,
} from "./controllers/renderController.mjs";

const table = document.getElementById("workPlaceTable");
table.addEventListener("click", editHandler);
document.getElementById("workPlaceForm").onsubmit = function (e) {
  insertData(e);
};

const localStorageRows = JSON.parse(localStorage.getItem("row"));
let rows =
  localStorageRows && localStorageRows.length > 0 ? localStorageRows : [];

renderFromStorage(rows, table);

function insertData(e) {
  let formData = new FormData(document.getElementById("workPlaceForm"));
  let rowObj = renderAfterInsert(formData, rows);

  rows.push(rowObj);
  localStorage.setItem("row", JSON.stringify(rows));
}

function editHandler(e) {
  const row = e.target;

  if (row.classList[0] === "delete-icon") {
    const item = row.parentNode.parentNode;
    let id = parseInt(item.getAttribute("id"));

    rows = rows.filter((row) => row.id !== id);
    localStorage.setItem("row", JSON.stringify(rows));

    item.remove();
  }

  if (row.classList[0] === "edit-icon") {
    const item = row.parentNode.parentNode;
    let id = parseInt(item.getAttribute("id"));

     
    let inputName = item.children[0].children[0];
    let selectOptions = item.children[1].children[0];
    let inputLocal = item.children[2].children[0];

    inputName.classList.add("enabled");
    selectOptions.classList.add("enabled");
    inputLocal.classList.add("enabled");

    inputName.disabled = false;
    selectOptions.disabled = false;
    inputLocal.disabled = false;

    console.log(inputLocal)
  }
}
