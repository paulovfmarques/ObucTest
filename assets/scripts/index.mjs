import {
  renderFromStorage,
  renderAfterInsert,
  renderEdit,
  renderDiscard,
  renderConfirm,
} from "./controllers/renderController.mjs";

let inputValues = {}; //Stores the current input data when editing a row. 

//Event listener to catch on the clicked icons
const table = document.getElementById("workPlaceTable");
table.addEventListener("click", editHandler);

document.getElementById("workPlaceForm").onsubmit = function (e) {
  insertData(e);
};

//Data initialization from localStorage 
const storedRows = JSON.parse(localStorage.getItem("arrLocaisTrabalho"));
let rows = storedRows && storedRows.length > 0 ? storedRows : [];

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
  const iconType = row.classList[0];

  switch (iconType) {
    case "delete-icon":
      deleteIconHandler(row);
      break;
    case "edit-icon":
      editIconHandler(row);
    case "discard-icon":
      discardIconHandler(row);
      break;
    case "confirm-icon":
      confirmIconHandler(row);
      break;
    default:
      break;
  }
}

function deleteIconHandler(row) {
  const item = row.parentNode.parentNode;
  let id = parseInt(item.getAttribute("id"));
  rows = rows.filter((r) => r.id !== id);
  localStorage.setItem("arrLocaisTrabalho", JSON.stringify(rows));
  item.remove();
}

function editIconHandler(row) {
  inputValues = renderEdit(row, inputValues);
}

function discardIconHandler(row) {
  renderDiscard(row, inputValues);
}

function confirmIconHandler(row) {
  const { id, updatedValues } = renderConfirm(row);

  rows = rows.filter((r) => r.id !== id);
  rows.push(updatedValues);
  rows = rows.sort((a, b) => a.id - b.id);

  localStorage.setItem("arrLocaisTrabalho", JSON.stringify(rows));
}
