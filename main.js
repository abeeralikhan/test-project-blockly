// blocks and data-blocks
const blocks = document.querySelectorAll("[draggable='true']");

// drop areas
const dropZone = document.querySelector(".code-blocks");
const dataStores = document.querySelectorAll(".data-store");
const childHolders = document.querySelectorAll(".holder.children");
const dataHoldersLogic = [
  ...document.querySelectorAll("[data-block-type='logic'] > .left-holder"),
  ...document.querySelectorAll("[data-block-type='logic'] > .right-holder"),
];

const dataHoldersMath = [
  ...document.querySelectorAll("[data-block-type='math'] > .left-holder"),
  ...document.querySelectorAll("[data-block-type='math'] > .right-holder"),
];

// TODO: Instead of accepting class name as parameter, accept an actual container like in the video
function getDragAfterBlock(containerClass, y) {
  const blocks = [
    ...document.querySelectorAll(`.${containerClass} > div:not(.dragging)`),
  ];

  return blocks.reduce(
    (closest, block) => {
      const box = block.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: block };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function closeSideBar(block) {
  if (block.classList.contains("persist")) makeAllHiddenAndRemoveColor();
}

function addDraggingClass(block) {
  block.addEventListener("dragstart", (e) => {
    e.stopPropagation();
    closeSideBar(block);
    block.classList.add("dragging");
  });
}

function removeDraggingClass(block) {
  block.addEventListener("dragend", (e) => {
    e.stopPropagation();

    block.classList.remove("dragging");
  });
}

/*
TODO: Register a new event listener on blocks having persist class
      Close the sidebar and add the block into the dom
      When user has clicked on one of the blocks from the sidebar
*/

blocks.forEach((block) => {
  addDraggingClass(block);
  removeDraggingClass(block);
});

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.stopPropagation();
  const draggedBlock = document.querySelector(".dragging");
  const afterBlock = getDragAfterBlock("code-blocks", e.clientY);

  if (!afterBlock) {
    try {
      dropZone.appendChild(draggedBlock);
      return;
    } catch (e) {
      return;
    }
  }

  try {
    dropZone.insertBefore(draggedBlock, afterBlock);
  } catch (e) {
    return;
  }
});

function getSubsideName(constructType) {
  switch (constructType) {
    case "math":
      return "math-subside";
    case "variable":
      return "variable-subside";
    case "loop":
      return "loop-subside";
    case "logic":
      return "logic-subside";
    case "text":
      return "text-subside";
    case "procedure":
      return "procedure-subside";
    default:
      return "";
  }
}

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  e.stopPropagation();
  const draggedBlock = document.querySelector(".dragging");

  if (!draggedBlock.classList.contains("persist")) return;

  draggedBlock.classList.remove("persist");

  const parentName = getSubsideName(draggedBlock.dataset.blockType);
  const parentNode = document.querySelector(`.${parentName} .blocks-list`);

  // if (!parentNode.childElementCount) return;

  const nodeIndex = +draggedBlock.dataset.index;
  const clonedBlock = draggedBlock.cloneNode(true);

  clonedBlock.classList.remove("dragging");
  clonedBlock.classList.add("persist");

  addDraggingClass(clonedBlock);
  removeDraggingClass(clonedBlock);

  if (
    clonedBlock.dataset.variableType === "set-variable" ||
    clonedBlock.dataset.blockType === "loop"
  ) {
    const dataStore = clonedBlock.children[0].children[1];
    listenToSomeNewBlocks(dataStore, {
      toInclude: [
        "math",
        "text",
        "get-variable",
        "logical-operation",
        "boolean-operation",
      ],
    });
  }

  // Same condition will be used for if then block etc
  if (clonedBlock.dataset.blockType === "loop") {
    const container = clonedBlock.children[1].children[1];
    listenToAllNewBlocks(container);
  }

  if (clonedBlock.dataset.mathType === "arithmetic-operation") {
    const leftContainer = clonedBlock.children[0];
    const rightContainer = clonedBlock.children[2];

    listenToSomeNewBlocks(leftContainer, {
      toInclude: ["math", "get-variable"],
    });
    listenToSomeNewBlocks(rightContainer, {
      toInclude: ["math", "get-variable"],
    });
  }

  if (
    clonedBlock.dataset.logicType === "logical-operation" ||
    clonedBlock.dataset.logicType === "boolean-operation"
  ) {
    const leftContainer = clonedBlock.children[0];
    const rightContainer = clonedBlock.children[2];

    listenToSomeNewBlocks(leftContainer, {
      toInclude: [
        "math",
        "text",
        "get-variable",
        "logical-operation",
        "boolean-operation",
      ],
    });
    listenToSomeNewBlocks(rightContainer, {
      toInclude: [
        "math",
        "text",
        "get-variable",
        "logical-operation",
        "boolean-operation",
      ],
    });
  }

  if (!parentNode.children[nodeIndex]) {
    try {
      parentNode.appendChild(clonedBlock);
      return;
    } catch (e) {
      console.error(e);
      return;
    }
  }

  try {
    parentNode.insertBefore(clonedBlock, parentNode.children[nodeIndex]);
    return;
  } catch (e) {
    console.error(e);
    return;
  }
});

// TODO: Implement a different after block detecting algorithm for holders
function listenToAllNewBlocks(container) {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const draggedBlock = document.querySelector(".dragging");
    const afterBlock = getDragAfterBlock("holder.children", e.clientY);

    if (!container.children.length) {
      try {
        container.appendChild(draggedBlock);
        return;
      } catch (e) {
        return;
      }
    }

    if (!afterBlock) {
      try {
        container.appendChild(draggedBlock);
        return;
      } catch (e) {
        return;
      }
    }

    try {
      container.insertBefore(draggedBlock, afterBlock);
    } catch (e) {
      return;
    }
  });
}

childHolders.forEach((holder) => listenToAllNewBlocks(holder));

function listenToSomeNewBlocks(container, config) {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (container.children.length) return;

    const draggedBlock = document.querySelector(".dragging");

    // TODO: Run a For..in loop over dataset, and dynamically check for the block type
    if (
      !config.toInclude.includes(draggedBlock.dataset.blockType) &&
      !config.toInclude.includes(draggedBlock.dataset.logicType) &&
      !config.toInclude.includes(draggedBlock.dataset.loopType) &&
      !config.toInclude.includes(draggedBlock.dataset.variableType) &&
      !config.toInclude.includes(draggedBlock.dataset.mathType) &&
      !config.toInclude.includes(draggedBlock.dataset.textType)
    )
      return;

    try {
      container.appendChild(draggedBlock);
      return;
    } catch (e) {
      return;
    }
  });
}

dataStores.forEach((dataStore) =>
  listenToSomeNewBlocks(dataStore, {
    toInclude: [
      "math",
      "text",
      "get-variable",
      "logical-operation",
      "boolean-operation",
    ],
  })
);

dataHoldersLogic.forEach((dataHolderLogic) =>
  listenToSomeNewBlocks(dataHolderLogic, {
    toInclude: [
      "math",
      "text",
      "get-variable",
      "logical-operation",
      "boolean-operation",
    ],
  })
);

dataHoldersMath.forEach((dataHolderMath) =>
  listenToSomeNewBlocks(dataHolderMath, {
    toInclude: ["math", "get-variable"],
  })
);
