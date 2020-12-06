import {
  renderFromStorage,
  renderAfterInsert,
  renderEdit,
  renderDiscard,
  renderConfirm,
} from "./controllers/renderController.mjs";

//Stores the current input data when editing a row.
let inputValues = {};

//Event listener to catch on the clicked icons
const table = document.getElementById("workPlaceTable");
table.addEventListener("click", editHandler);

document.getElementById("workPlaceForm").onsubmit = (e) => insertData(e);

//Data initialization from localStorage
const storedRows = JSON.parse(localStorage.getItem("arrLocaisTrabalho"));
let rows = storedRows && storedRows.length > 0 ? storedRows : [];

//Enables the side menu selection
addSelectionEvent();

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
      addDeleteEvent(row);
      break;
    case "edit-icon":
      editIconHandler(row);
      break;
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

function addDeleteEvent(row) {
  const confirmDelete = document.getElementById("confirm-delete");
  confirmDelete.addEventListener("click", () => deleteIconHandler(row));
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

function addSelectionEvent() {
  const btnNodeArray = document.querySelectorAll(".panel-btn");

  btnNodeArray.forEach((btn) => {
    btn.addEventListener("click", (e) =>
      selectPanel(e.target.parentNode.children[0])
    );
  });
}

function selectPanel(btnNode) {
  const panelNodeArray = document.querySelectorAll(".panel");  
  
  panelNodeArray.forEach(panel => {
    if(btnNode.classList[1] !== panel.classList[1]){
      panel.classList.add("hidden");
    } else{
      panel.classList.remove("hidden")
    }
  })
}
