const createVariableBtn = document.querySelector(".create-var");
const variables = [];

createVariableBtn.addEventListener("click", (e) => {
  e.preventDefault();

  while (true) {
    let newVariableName = prompt("New variable name:");

    if (!newVariableName) return;

    newVariableName = newVariableName.trim();

    if (newVariableName.includes(" "))
      newVariableName = newVariableName.split(" ").join("_");

    const newVariableEl = createNewVariable(newVariableName);

    if (!newVariableEl) {
      alert("Variable name already exist");
      continue;
    }

    appendNewVariableToDom(newVariableEl);
    appendNewVariableToVariables(newVariableName);

    return;
  }
});

function createNewVariable(name) {
  if (variables.includes(name)) return;

  const newVariableEl = document.createElement("option");
  newVariableEl.setAttribute("value", name);
  newVariableEl.innerText = name;

  return newVariableEl;
}

function appendNewVariableToDom(element) {
  const variableLists = document.querySelectorAll(".variable-list > select");

  variableLists.forEach((variableList) => {
    // we're cloning the original block because we wanna insert
    // the copies of a single block to multiple elements
    // if not cloned, then original block will move from one element to another
    variableList.appendChild(element.cloneNode(true));
  });
}

function appendNewVariableToVariables(variableName) {
  variables.push(variableName);
}
