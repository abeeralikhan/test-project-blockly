const menu_driven_div = document.querySelector(".target-div");
const root = document.querySelector("#coding-area");
// const code_block = document.querySelector(".code-block");
//for div on display
const math_div = document.querySelector(".math-side-bar");
const var_div = document.querySelector(".var-side-bar");
const for_div = document.querySelector(".loop-side-bar");

//for navs to target
const math = document.querySelector(".math-nav");
const variable = document.querySelector(".var-nav");
const loop = document.querySelector(".for-nav");

//blocks types
const math_block = document.querySelector("#math-block");
const var_block = document.querySelector("#var-block");
const loop_block = document.querySelector("#loop-block");

// main funcion handling sidebar display

const makeOneToggle = (target_nav, supporting_nav1, supporting_nav2) => {
  if (target_nav.classList.contains("hidden")) {
    supporting_nav1.classList.add("hidden");
    supporting_nav2.classList.add("hidden");
    target_nav.classList.remove("hidden");
    target_nav.classList.add("visible");
  } else {
    target_nav.classList.remove("visible");
    target_nav.classList.add("hidden");
  }
};

const makeAllHidden = () => {
  if (!menu_driven_div.classList.contains("hidden")) {
    menu_driven_div.classList.add("hidden");
    menu_driven_div.classList.remove("visible");
  }
};

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

math.addEventListener("click", () => {
  makeAllHidden();
  makeOneToggle(math_div, for_div, var_div);
  stylings(math_div, math, variable, loop, math_block, "#5B67A5");
  makeClear(variable, loop);
});

variable.addEventListener("click", () => {
  makeAllHidden();
  makeOneToggle(var_div, for_div, math_div);
  stylings(var_div, variable, math, loop, var_block, "#A55B80");
  makeClear(math, loop);
});

loop.addEventListener("click", () => {
  makeAllHidden();
  stylings(for_div, loop, math, variable, loop_block, "#5BA55B");
  makeOneToggle(for_div, var_div, math_div);
  makeClear(math, variable);
});

root.addEventListener("click", () => {
  makeAllHidden();
});