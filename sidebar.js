const menu_driven_div = document.querySelector(".parent-overlay-bar");
const root = document.querySelector(".root");
const code_block = document.querySelector(".code-block");
//for div on display
const var_div = document.querySelector(".div1");
const for_div = document.querySelector(".div2");
const if_div = document.querySelector(".div3");

//for navs to target
const variable = document.querySelector(".variable");
const forloop = document.querySelector(".for-loop");
const condition = document.querySelector(".if");

// main funcion handling sidebar display

const main_func = (target_nav, supporting_nav1, supporting_nav2) => {
  if (target_nav.classList.contains("hidden")) {
    target_nav.classList.remove("hidden");
    supporting_nav1.classList.add("hidden"); //for_div --> variable, var_div --> for, var_div --> if
    supporting_nav2.classList.add("hidden"); //if_div --> variable, if_div --> for, for_div --> if
    target_nav.classList.add("visible");
  } else {
    target_nav.classList.remove("visible");
    target_nav.classList.add("hidden");
  }
};

variable.addEventListener("click", () => {
  main_func(var_div, for_div, if_div);
});

forloop.addEventListener("click", () => {
  main_func(for_div, var_div, if_div);
});

condition.addEventListener("click", () => {
  main_func(if_div, var_div, for_div);
});

// for hiding the sidebar on the root and blocks click

const hide = (menu_driven_div) => {
  if (menu_driven_div.classList.contains("visible")) {
    menu_driven_div.classList.remove("visible");
    menu_driven_div.classList.add("hidden");
  }
};

root.addEventListener("click", () => {
  hide(menu_driven_div);
});
code_block.addEventListener("click", () => {
  hide(menu_driven_div);
});
