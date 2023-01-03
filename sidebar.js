// const root = document.getElementsByClassName("code-blocks");

// console.log(root.children);

const menu_driven_div = document.querySelector(".parent-overlay-bar");
const side_menu = document.querySelectorAll(".sides");

// const htmlDOM = document.querySelector(".bodytag");

let isClicked = true;

// makeAllHidden(){
//   if(!menu_driven_div.contains('.hidden')){
//     menu_driven_div.classList.add('.hidden')
//   }
// }

side_menu.forEach((e) => {
  e.addEventListener("click", () => {
    if (isClicked) {
      menu_driven_div.style.visibility = "visible";
      isClicked = false;
    } else {
      menu_driven_div.style.visibility = "hidden";
      isClicked = true;
    }
  });
});

// const display_div = () => {
//   if (isClicked) {
//     menu_driven_div.style.visibility = "visible";
//     isClicked = false;
//   } else {
//     menu_driven_div.style.visibility = "hidden";
//     isClicked = true;
//   }
// };
const hide_div = () => {
  if (!isClicked) {
    menu_driven_div.style.visibility = "hidden";
    isClicked = true;
  }
};
