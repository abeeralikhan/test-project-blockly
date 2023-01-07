const sidebarLis = document.querySelectorAll(".navs > p");
const subSidebars = document.querySelectorAll(".target-div");
const closeButtons = document.querySelectorAll(".navs .header p");
const navLis = document.querySelectorAll(".navs");

console.log(closeButtons);

console.log(subSidebars);

//blocks types
const math_block = document.querySelector("#math-block");
const var_block = document.querySelector("#var-block");
const loop_block = document.querySelector("#loop-block");

// main funcion handling sidebar display

// const makeOneToggle = (target_nav, supporting_nav1, supporting_nav2) => {
//   if (target_nav.classList.contains("hidden")) {
//     supporting_nav1.classList.add("hidden");
//     supporting_nav2.classList.add("hidden");
//     target_nav.classList.remove("hidden");
//     target_nav.classList.add("visible");
//   } else {
//     target_nav.classList.remove("visible");
//     target_nav.classList.add("hidden");
//   }
// };

// navLis.forEach((navLi) => {
//   navLi.addEventListener("click", () => {
//       navLi.classList.add("colors");
//   });
// });

const makeAllHidden = () => {
  subSidebars.forEach((subSidebar) => {
    if (!subSidebar.classList.contains("hidden")) {
      subSidebar.classList.add("hidden");
    }
  });
};

const makeOneHide = () => {
  subSidebars.forEach((targetBar) => {
    targetBar.addEventListener("click", () => {
      if (!targetBar.classList.contains("hidden")) {
        targetBar.classList.add("hidden");
      }
    });
  });
};

const removeAllColors = () => {};

const stylings = (
  target_div,
  target_nav,
  inactive_nav1,
  inactive_nav2,
  target_block,
  colorCode
) => {
  if (target_div.classList.contains("visible")) {
    target_nav.style.backgroundColor = colorCode;
    target_nav.style.color = "white";
    inactive_nav1.style.backgroundColor = "";
    inactive_nav2.style.backgroundColor = "";
    target_block.style.backgroundColor = colorCode;
  } else {
    target_nav.style.backgroundColor = "";
    target_nav.style.color = "";
  }
};

const makeClear = (inactive_nav1, inactive_nav2) => {
  inactive_nav1.style.color = "";
  inactive_nav2.style.color = "";
};

// math.addEventListener("click", () => {
//   makeAllHidden();
//   makeOneToggle(math_div, for_div, var_div);
//   stylings(math_div, math, variable, loop, math_block, "#5B67A5");
//   makeClear(variable, loop);
// });

// variable.addEventListener("click", () => {
//   makeAllHidden();
//   makeOneToggle(var_div, for_div, math_div);
//   stylings(var_div, variable, math, loop, var_block, "#A55B80");
//   makeClear(math, loop);
// });

// loop.addEventListener("click", () => {
//   makeAllHidden();
//   stylings(for_div, loop, math, variable, loop_block, "#5BA55B");
//   makeOneToggle(for_div, var_div, math_div);
//   makeClear(math, variable);
// });

// root.addEventListener("click", () => {
//   makeAllHidden();
// });

// sidebarLis.forEach((sidebarLi) => {
//   sidebarLi.addEventListener("click", () => {
//     console.log(sidebarLi);
//     makeAllHidden();
//     const subSidebar = sidebarLi.parentNode.querySelector(".target-div");
//     subSidebar.classList.contains("hidden");
//     subSidebar.classList.remove("hidden");
//   });
// });

navLis.forEach((sidebarLi) => {
  sidebarLi.addEventListener("click", () => {
    makeAllHidden();
    const subSidebar = sidebarLi.parentNode.querySelector(".target-div");
    if (
      !sidebarLi.classList.contains("colors") &&
      subSidebar.classList.contains("hidden")
    ) {
      sidebarLi.classList.add("colors");
      subSidebar.classList.remove("hidden");
    } else {
      sidebarLi.classList.remove("colors");
    }
    console.log(sidebarLi);
  });
});

// sidebarLis.forEach((sidebar) => {
//   sidebar.addEventListener("click", () => {
//     const side = sidebar.parentNode.querySelector(".target-div");
//     if (!side.classList.contains("hidden")) {
//       side.classList.toggle("hidden");
//     }
//   });
// });

closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    makeAllHidden();
  });
});
