export function renderFromStorage(rows, table) {
  if (rows && rows.length > 0) {
    for (let i = 0; i < rows.length; i++) {
      createRow(rows[i], table);
    }
  }
}

export function renderAfterInsert(formData, rows, table) {
  let dataArr = [];

  const maxId = findMaxId(rows);

  for (let value of formData.values()) {
    dataArr.push(value);
  }

  let rowObj = {
    id: maxId + 1,
    funcionario: dataArr[0],
    predio: dataArr[1],
    local: dataArr[2],
  };

  createRow(rowObj, table);

  return rowObj;
}

export function renderEdit(row, currentValues) {
  const item = row.parentNode.parentNode;

  let newButtons = row.parentNode;

  newButtons.innerHTML = `
        <ion-icon class="confirm-icon" name="checkmark"></ion-icon>
        <ion-icon class="discard-icon" name="close"></ion-icon>
    `;

  let inputName = item.children[0].children[0];
  let selectOptions = item.children[1].children[0];
  let inputLocal = item.children[2].children[0];

  currentValues = {
    funcionario: inputName.value,
    predio: selectOptions.value,
    local: inputLocal.value,
  };

  inputName.classList.add("enabled");
  selectOptions.classList.add("enabled");
  inputLocal.classList.add("enabled");

  inputName.disabled = false;
  selectOptions.disabled = false;
  inputLocal.disabled = false;

  return currentValues;
}

export function renderDiscard(row, currentValues) {
  let { inputName, selectOptions, inputLocal } = returnLayout(row);

  inputName.value = currentValues.funcionario;
  selectOptions.value = currentValues.predio;
  inputLocal.value = currentValues.local;
}

export function renderConfirm(row) {
  let { item, inputName, selectOptions, inputLocal } = returnLayout(row);
  let id = parseInt(item.getAttribute("id"));

  const updatedValues = {
    id,
    funcionario: inputName.value,
    predio: selectOptions.value,
    local: inputLocal.value,
  };

  return { id, updatedValues };
}

function createRow(inputValue, table) {
  let newRow = document.createElement("tr");
  newRow.id = inputValue.id;

  let newFuncionario = document.createElement("td");
  newFuncionario.innerHTML = `<input disabled value=${inputValue.funcionario}>`;
  newRow.appendChild(newFuncionario);

  let newPredio = document.createElement("td");
  newPredio.innerHTML = `
      <select class="editable" name="predio" id="predio" required disabled >            
            <option value="Prédio 1" ${
              inputValue.predio === "Prédio 1" ? "selected" : ""
            } >Prédio 1</option>
            <option value="Prédio 2" ${
              inputValue.predio === "Prédio 2" ? "selected" : ""
            } >Prédio 2</option>
            <option value="Prédio 3" ${
              inputValue.predio === "Prédio 3" ? "selected" : ""
            } >Prédio 3</option>                        
      </select>`;
  newRow.appendChild(newPredio);

  let newLocal = document.createElement("td");
  newLocal.innerHTML = `<input disabled value=${inputValue.local}>`;
  newRow.appendChild(newLocal);

  let editSection = document.createElement("td");
  editSection.classList.add("edit-container");

  editSection.innerHTML = `
            <ion-icon class="edit-icon" name="create"></ion-icon>
            <ion-icon class="delete-icon" name="trash"></ion-icon>
        `;
  newRow.appendChild(editSection);

  table.appendChild(newRow);
}

function returnLayout(row) {
  const item = row.parentNode.parentNode;

  let inputName = item.children[0].children[0];
  let selectOptions = item.children[1].children[0];
  let inputLocal = item.children[2].children[0];

  inputName.classList.remove("enabled");
  selectOptions.classList.remove("enabled");
  inputLocal.classList.remove("enabled");

  inputName.disabled = true;
  selectOptions.disabled = true;
  inputLocal.disabled = true;

  let oldButtons = row.parentNode;

  oldButtons.innerHTML = `
        <ion-icon class="edit-icon" name="create"></ion-icon>
        <ion-icon class="delete-icon" name="trash"></ion-icon>
    `;
  return { item, inputName, selectOptions, inputLocal };
}

function findMaxId(rows) {
  let maxId = 0;

  if (rows && rows.length > 0) {
    const idArr = rows.map((row) => row.id);
    const sortedIdArr = idArr.sort((a, b) => a - b);
    maxId = sortedIdArr[sortedIdArr.length - 1];
  }

  return maxId;
}
