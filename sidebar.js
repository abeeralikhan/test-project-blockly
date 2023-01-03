// const root = document.getElementsByClassName("code-blocks");

// console.log(root.children);

const menu_driven_div = document.querySelector(".parent-overlay-bar");
const var_div = document.querySelector(".div1");
const for_div = document.querySelector(".div2");
const if_div = document.querySelector(".div3");
const side_menu = document.querySelectorAll(".sides");

// const htmlDOM = document.querySelector(".bodytag");

let isClicked = true;

// makeAllHidden(){
//   if(!menu_driven_div.contains('.hidden')){
//     menu_driven_div.classList.add('.hidden')
//   }
// }

const makehide = () => {
  if (var_div.classList.contains("hidden")) {
    var_div.classList.remove("hidden");
    var_div.classList.add("visible");
  } else {
    var_div.classList.remove("visible");
    var_div.classList.add("hidden");
  }
};

const makehide2 = () => {
  if (for_div.classList.contains("hidden")) {
    for_div.classList.remove("hidden");
    for_div.classList.add("visible");
  } else {
    for_div.classList.remove("visible");
    for_div.classList.add("hidden");
  }
};

const makehide3 = () => {
  if (if_div.classList.contains("hidden")) {
    if_div.classList.remove("hidden");
    if_div.classList.add("visible");
  } else {
    if_div.classList.remove("visible");
    if_div.classList.add("hidden");
  }
};

const hide_div = () => {
  if (menu_driven_div.classList.contains("visible")) {
    menu_driven_div.classList.remove("visible");
    menu_driven_div.classList.add("hidden");
  }
};
