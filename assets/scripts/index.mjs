import {
  renderFromStorage,
  renderAfterInsert,
  renderEdit,
  renderDiscard,
  renderConfirm,
} from "./controllers/renderController.mjs";

let inputValues = {};

const table = document.getElementById("workPlaceTable");
table.addEventListener("click", editHandler);
document.getElementById("workPlaceForm").onsubmit = function (e) {
  insertData(e);
};

const localStorageRows = JSON.parse(localStorage.getItem("arrLocaisTrabalho"));
let rows =
  localStorageRows && localStorageRows.length > 0 ? localStorageRows : [];

renderFromStorage(rows, table);

function insertData(e) {
  e.preventDefault();
  
  let formData = new FormData(document.getElementById("workPlaceForm"));
  let rowObj = renderAfterInsert(formData, rows, table);

  rows.push(rowObj);
  localStorage.setItem("arrLocaisTrabalho", JSON.stringify(rows));
}

function editHandler(e) {
  const row = e.target;

  if (row.classList[0] === "delete-icon") {
    const item = row.parentNode.parentNode;
    let id = parseInt(item.getAttribute("id"));

    rows = rows.filter((r) => r.id !== id);
    localStorage.setItem("arrLocaisTrabalho", JSON.stringify(rows));

    item.remove();
  }

  if (row.classList[0] === "edit-icon") {
    inputValues = renderEdit(row, inputValues);
  }

  if (row.classList[0] === "discard-icon") {
    renderDiscard(row, inputValues);
  }

  if (row.classList[0] === "confirm-icon") {
    const { id, updatedValues } = renderConfirm(row);

    rows = rows.filter((r) => r.id !== id);
    rows.push(updatedValues);
    rows = rows.sort((a, b) => a.id - b.id);

    localStorage.setItem("arrLocaisTrabalho", JSON.stringify(rows));
  }
}
