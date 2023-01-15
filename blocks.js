function getGetVariableBlockTemplate() {
  return `
  <div
    class="code-block persist"
    data-block-type="variable"
    data-variable-type="get-variable"
    data-variable-name="value"
    draggable="true"
  >
    <div class="block-header centered">
      <p class="description">
        get
        <label
          for="variable-list"
          class="variable-name variable-list"
        >
          <select name="variable-name"></select>
        </label>
      </p>
    </div>
  </div>`;
}

function getSetVariableBlockTemplate() {
  return `
  <div
    class="code-block persist"
    data-block-type="variable"
    data-variable-type="set-variable"
    draggable="true"
  >
    <div class="block-header centered">
      <p class="description">
        set
        <label
          for="variable-list"
          class="variable-name variable-list"
        >
          <select name="variable-name"></select>
        </label>
        to
      </p>
      <div class="data-store"></div>
    </div>
  </div>`;
}
