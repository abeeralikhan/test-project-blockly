const sidebarLis = document.querySelectorAll(".navs > p");
const subSidebars = document.querySelectorAll(".target-div");
const navLis = document.querySelectorAll(".navs");
const closeButtons = document.querySelectorAll(".sidebar-header > span");
const colorMappings = {
  math: "math-color",
  variable: "variable-color",
  loop: "loop-color",
  logic: "logic-color",
  text: "text-color",
  procedure: "procedure-color",
};

const makeAllHiddenAndRemoveColor = (ignoreSubSidebar = "") => {
  subSidebars.forEach((subSidebar) => {
    if (
      !subSidebar.classList.contains("hidden") &&
      subSidebar.classList[1] !== ignoreSubSidebar
    ) {
      subSidebar.classList.add("hidden");
      subSidebar.parentNode.classList.remove(
        colorMappings[subSidebar.classList[1]]
      );
      subSidebar.parentNode.classList.remove("fg-color");
    }
  });
};

// const stylings = (
//   target_div,
//   target_nav,
//   inactive_nav1,
//   inactive_nav2,
//   target_block,
//   colorCode
// ) => {
//   if (target_div.classList.contains("visible")) {
//     target_nav.style.backgroundColor = colorCode;
//     target_nav.style.color = "white";
//     inactive_nav1.style.backgroundColor = "";
//     inactive_nav2.style.backgroundColor = "";
//     target_block.style.backgroundColor = colorCode;
//   } else {
//     target_nav.style.backgroundColor = "";
//     target_nav.style.color = "";
//   }
// };

// const makeClear = (inactive_nav1, inactive_nav2) => {
//   inactive_nav1.style.color = "";
//   inactive_nav2.style.color = "";
// };

// navLis.forEach((sidebarLi) => {
//   sidebarLi.addEventListener("click", () => {
//     makeAllHidden();
//     const subSidebar = sidebarLi.parentNode.querySelector(".target-div");
//     if (
//       !sidebarLi.classList.contains("colors") &&
//       subSidebar.classList.contains("hidden")
//     ) {
//       sidebarLi.classList.add("colors");
//       subSidebar.classList.remove("hidden");
//     } else {
//       sidebarLi.classList.remove("colors");
//     }
//     console.log(sidebarLi);
//   });
// });

sidebarLis.forEach((sidebarLi) => {
  sidebarLi.addEventListener("click", () => {
    const subSidebar = sidebarLi.parentNode.querySelector(".target-div");
    makeAllHiddenAndRemoveColor(subSidebar.classList[1]);

    subSidebar.classList.toggle("hidden");
    subSidebar.parentNode.classList.toggle(
      colorMappings[subSidebar.classList[1]]
    );
    subSidebar.parentNode.classList.toggle("fg-color");
  });
});

closeButtons.forEach((closeButton) =>
  closeButton.addEventListener("click", makeAllHiddenAndRemoveColor)
);
