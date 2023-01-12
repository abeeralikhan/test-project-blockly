const createVariableBtn = document.querySelector(".create-var");

createVariableBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const newVariableName = prompt("New variable name:");

  if (!newVariableName) return;

  console.log(newVariableName);
});
