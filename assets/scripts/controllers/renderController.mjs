export function renderFromStorage(rows, table) {
  if (rows && rows.length > 0) {
    for (let i = 0; i < rows.length; i++) {
      let newRow = document.createElement("tr");
      newRow.id = rows[i].id;

      let newFuncionario = document.createElement("td");
      newFuncionario.innerHTML = `<input disabled value=${rows[i].funcionario}>`;
      newRow.appendChild(newFuncionario);

      let newPredio = document.createElement("td");
      newPredio.innerHTML = `
      <select class="editable" name="predio" id="predio" required disabled >            
            <option value="Prédio 1" ${
              rows[i].predio === "Prédio 1" ? "selected" : ""
            } >Prédio 1</option>
            <option value="Prédio 2" ${
              rows[i].predio === "Prédio 2" ? "selected" : ""
            } >Prédio 2</option>
            <option value="Prédio 3" ${
              rows[i].predio === "Prédio 3" ? "selected" : ""
            } >Prédio 3</option>                        
      </select>`;            
      newRow.appendChild(newPredio);

      let newLocal = document.createElement("td");
      newLocal.innerHTML = `<input disabled value=${rows[i].local}>`;
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
  }
}

export function renderAfterInsert(formData, rows) {
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

  return rowObj;
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
