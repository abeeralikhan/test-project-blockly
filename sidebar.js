const sidebarLis = document.querySelectorAll(".navs > p");
const subSidebars = document.querySelectorAll(".target-div");
const closeButtons = document.querySelectorAll(".sidebar-header > span");

function getBlockColorClass(blockType) {
  switch (blockType) {
    case "math-subside":
      return "math-color";
    case "variable-subside":
      return "variable-color";
    case "loop-subside":
      return "loop-color";
    case "logic-subside":
      return "logic-color";
    case "text-subside":
      return "text-color";
    case "procedure-subside":
      return "procedure-color";
    default:
      return "";
  }
}

function makeAllHiddenAndRemoveColor(ignoreSubSidebar = "") {
  subSidebars.forEach((subSidebar) => {
    if (
      !subSidebar.classList.contains("hidden") &&
      subSidebar.classList[1] !== ignoreSubSidebar
    ) {
      subSidebar.classList.add("hidden");
      subSidebar.parentNode.classList.remove(
        getBlockColorClass(subSidebar.classList[1])
      );
      subSidebar.parentNode.classList.remove("fg-color");
    }
  });
}

// function updateVariablesSidebar() {
//   const variableSubside = document.querySelector(
//     ".variable-subside .blocks-list"
//   );

//   variableSubside.innerHTML += getSetVariableBlockTemplate();
//   variableSubside.innerHTML += getGetVariableBlockTemplate();
// }

// function makeVariableBlocksDraggable() {
//   const variableBlocks = [
//     ...document.querySelector(".variable-subside .blocks-list").children,
//   ];

//   variableBlocks.forEach((variableBlock) => {
//     if (variableBlock.dataset.blockType)
//       variableBlock.setAttribute("draggable", "true");
//   });
// }

sidebarLis.forEach((sidebarLi) => {
  sidebarLi.addEventListener("click", () => {
    const subSidebar = sidebarLi.parentNode.querySelector(".target-div");
    makeAllHiddenAndRemoveColor(subSidebar.classList[1]);

    subSidebar.classList.toggle("hidden");
    subSidebar.parentNode.classList.toggle(
      getBlockColorClass(subSidebar.classList[1])
    );
    subSidebar.parentNode.classList.toggle("fg-color");
  });
});

closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", makeAllHiddenAndRemoveColor);
});
