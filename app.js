// C language Transpiler
class ProgCLang {
  ////////////////// #01 Math Wrappers ////////////////////////
  createNumber(value) {
    if (value == "") {
      return 0;
    }
    return `${value}`;
  }

  createOperator(operatorType, leftOperator, rightOperator) {
    return `(${leftOperator} ${operatorType} ${rightOperator})`;
  }

  ////////////////// #02 Variable Wrappers ////////////////////
  createVariable(name, dtype, value) {
    let b = "";
    if (dtype === "string") {
      dtype = "char";
      b = "[]";
    }

    if (value != "''") {
      return `${dtype} ${name}${b} = ${value}`;
    } else {
      return `${dtype} ${name}${b}`;
    }
  }

  setVariable(varName, varValue) {
    return `${varName} = ${varValue}`;
  }

  getVariable(varName) {
    return `${varName}`;
  }

  /////////////////// #03 Loop Wrappers ///////////////////////
  createWhileLoop(loopCondition, loopBody) {
    return `while (${loopCondition}){
    ${loopBody}
    }`;
  }

  createDoWhileLoop(loopCondition, loopBody) {
    return `do{
            ${loopBody}
        } while (${loopCondition})`;
  }

  createForLoop(i, from, till, incre, body) {
    return `for (${i} = ${from}; ${i} < ${till}; ${i} += ${incre}) {
            ${body}
        }`;
  }

  createIntruder(intruderType) {
    return `${intruderType}`;
  }

  /////////////////// #04 Logic Wrappers ////////////////////
  createIF(condition, body) {
    return `if (${condition}) {
            ${body}
        }`;
  }

  createElseIF(condition, body) {
    return `else if (${condition}) {
            ${body}
        }`;
  }

  createElse(body) {
    return `else {
            ${body}
        }`;
  }

  createSwitch(operation, cases, default_body) {
    return `switch (${operation}) {
            ${cases}
            default :
                ${default_body}
            }`;
  }

  createCase(i, body) {
    return `case ${i} :
            ${body}`;
  }

  createNot(body) {
    return `!${body}`;
  }

  ////////////////// #05 Text Wrappers ///////////////////////
  createChar(char) {
    return `"${char}"`;
  }

  createString(string) {
    return `"${string}"`;
  }

  createPrint(toPrint) {
    return `printf(${toPrint})`;
  }

  ////////////////// #06 Procedure Wrappers //////////////////
  callFunc(name, args, end = true) {
    return `${name}(${args})`;
  }

  createProc(name, params, body, ret, retValue) {
    if (ret == false) {
      return `void ${name}(${params}) {
                ${body}
            }`;
    } else {
      return `${ret} ${name}(${params}) {
                ${body}
            return ${retValue};
            }`;
    }
  }

  ////////////////// #07 Misc. Wrappers /////////////////////
  createHeader(header) {
    return `#include <${header}>`;
  }

  createNull() {
    return `null`;
  }
}

////////////////// Conversion Class /////////////////////
class BlocktoCode {
  constructor() {
    const cLang = new ProgCLang();
    this.languages = { c: cLang };
    this.languageObj = "";
    this.root = document.querySelector(".code-blocks");
    this.textMethods = { number: this.handleValueBlock };
    this.procs = {
      variable: this.handleVariable,
      logic: this.handleOperators,
      while: this.handleLoop,
    };
    this.headers = [];
  }

  // 1. Code Blocks Iterator
  generateCode(lang) {
    // Selecting conversion language
    this.languageObj = this.languages[lang];
    let res = ``;
    let heads = ``;

    for (let i = 0; i < this.root.childElementCount; i++) {
      let block = this.root.children[i];
      res += this.blocksManager(block, true) + "\n";
    }

    // Pushing header file names
    if (this.headers.length > 0) {
      for (let i = 0; i < this.headers.length; i++) {
        heads += this.languageObj.createHeader(this.headers[i]) + "\n";
      }
      heads += "\n";
    }
    heads += res;
    const codeHolder = document.querySelector(".code-holder");
    codeHolder.innerText = heads;
  }

  blocksManager(block, end = false) {
    if (end) {
      end = ";";
    } else {
      end = "";
    }

    ////////////////// #01 Maths Call ////////////////////////
    if (block.dataset.blockType == "math") {
      return this.handleMath(block) + end;
    }

    ////////////////// #02 Variables Call ///////////////////
    else if (block.dataset.blockType == "variable") {
      let t = this.handleVariable(block);
      if (t != undefined) {
        return this.handleVariable(block) + end;
      } else {
        return "";
      }
    }

    ////////////////// #03 Loop Call ////////////////////////
    else if (block.dataset.blockType == "loop") {
      let t = this.handleLoop(block);
      if (t != undefined) {
        return this.handleLoop(block) + end;
      } else {
        return "";
      }
    }

    ////////////////// #04 Logics Call //////////////////////
    else if (block.dataset.blockType == "logic") {
      return this.handleLogic(block) + end;
    }

    ////////////////// #05 Texts Call ///////////////////////
    else if (block.dataset.blockType == "text") {
      return this.handleText(block) + end;
    }

    ////////////////// #06 Procedures Call //////////////////
    else if (block.dataset.blockType == "procedure") {
      return this.handleProc(block) + end;
    }
  }

  handleOperators(element) {
    let leftOp = 0;
    let rightOp = 0;
    let operator = element.children[1].value;
    // wrap left operand
    if (element.children[0].childElementCount > 0) {
      leftOp = this.blocksManager(element.children[0].children[0]);
    }
    // wrap right operand
    if (element.children[2].childElementCount > 0) {
      rightOp = this.blocksManager(element.children[2].children[0]);
    }
    return this.languageObj.createOperator(operator, leftOp, rightOp);
  }

  ////////////////// #01 Maths Handler ////////////////////////
  handleMath(element) {
    if (element.dataset.mathType == "single-num") {
      return this.languageObj.createNumber(element.children[0].value);
    } else if (element.dataset.mathType == "arithmetic-operation") {
      return this.handleOperators(element);
    }
  }

  ////////////////// #02 Variables Handler ////////////////////
  handleVariable(element) {
    if (element.dataset.variableType == "set-variable") {
      if (element.children[0].children[0].className != "warning active") {
        let valueElement = element.children[0].children[2].children[0];
        let val = "''";
        let varName =
          element.children[0].children[1].children[0].children[0].options[
            element.children[0].children[1].children[0].children[0]
              .selectedIndex
          ].text;

        // getting value element connected to set block (if found any)
        if (valueElement != undefined) {
          val = this.blocksManager(valueElement);
        }
        return this.languageObj.setVariable(varName, val);
      } else {
        return;
      }
    } else if (element.dataset.variableType == "get-variable") {
      if (element.children[0].children[0].className != "warning active") {
        return element.children[0].children[1].children[0].children[0].options[
          element.children[0].children[1].children[0].children[0].selectedIndex
        ].text;
      } else {
        return;
      }
    } else if (element.dataset.variableType == "create-variable") {
      let valueElement = element.children[0].children[5].children[0];
      let val = "''";

      if (valueElement != undefined) {
        val = this.blocksManager(valueElement);
      }

      return this.languageObj.createVariable(
        element.children[0].children[3].value,
        element.children[0].children[1].value,
        val
      );
    }
  }

  ////////////////// #03 Loops Handler ///////////////////////
  handleLoop(element) {
    if (element.dataset.loopType == "break-continue") {
      if (element.children[0].children[0].className != "warning active") {
        if (
          element.children[0].children[1].options[
            element.children[0].children[1].selectedIndex
          ].text == "break out"
        ) {
          return this.languageObj.createIntruder("break");
        } else {
          return this.languageObj.createIntruder("continue");
        }
      }
    } else if (
      element.dataset.loopType == "while" ||
      element.dataset.loopType == "until"
    ) {
      let loopCondition = 0;
      let loopBody = ``;
      let until = "";

      if (element.dataset.loopType == "until") {
        until = "!";
      }

      // Wrap Loop Condition
      if (element.children[0].children[1].childElementCount > 0) {
        let condition_block = element.children[0].children[1].children[0];
        loopCondition = this.blocksManager(condition_block);
      }

      // Wrap Loop Body
      if (element.children[1].children[1].childElementCount > 0) {
        for (
          let i = 0;
          i < element.children[1].children[1].childElementCount;
          i++
        ) {
          let block = element.children[1].children[1].children[i];
          loopBody += this.blocksManager(block, true);

          if (i + 1 < element.children[1].children[1].childElementCount) {
            loopBody += "\n";
          }
        }
      }
      return this.languageObj.createWhileLoop(until + loopCondition, loopBody);
    } else if (element.dataset.loopType == "do-while") {
      let loopCondition = 0;
      let loopBody = ``;

      // Wrap Loop Condition
      if (element.children[1].children[1].childElementCount > 0) {
        let condition_block = element.children[1].children[1].children[0];
        loopCondition = this.blocksManager(condition_block);
      }

      // Wrap Loop Body
      if (element.children[0].children[1].childElementCount > 0) {
        for (
          let i = 0;
          i < element.children[0].children[1].childElementCount;
          i++
        ) {
          let block = element.children[0].children[1].children[i];
          loopBody += this.blocksManager(block, true);

          if (i + 1 < element.children[0].children[1].childElementCount) {
            loopBody += "\n";
          }
        }
      }
      return this.languageObj.createDoWhileLoop(loopCondition, loopBody);
    } else if (element.dataset.loopType == "for") {
      let var_block = "__select__";
      let from = 0;
      let till = 0;
      let increm = 0;
      let loopBody = "";

      // console.log(element.children[0].children[1].children[0].children[0]);
      // Wrap Loop Variable
      if (
        element.children[0].children[1].children[0].children[0] != undefined
      ) {
        var_block = this.blocksManager(
          element.children[0].children[1].children[0].children[0]
        );
      }

      if (
        element.children[0].children[1].children[2].children[0] != undefined
      ) {
        from = this.blocksManager(
          element.children[0].children[1].children[2].children[0]
        );
      }

      if (
        element.children[0].children[1].children[4].children[0] != undefined
      ) {
        till = this.blocksManager(
          element.children[0].children[1].children[4].children[0]
        );
      }

      if (
        element.children[0].children[1].children[6].children[0] != undefined
      ) {
        increm = this.blocksManager(
          element.children[0].children[1].children[6].children[0]
        );
      }

      // Wrap Loop Body
      if (element.children[1].children[1].childElementCount > 0) {
        for (
          let i = 0;
          i < element.children[1].children[1].childElementCount;
          i++
        ) {
          let block = element.children[1].children[1].children[i];
          loopBody += this.blocksManager(block, true);

          if (i + 1 < element.children[1].children[1].childElementCount) {
            loopBody += "\n";
          }
        }
      }

      return this.languageObj.createForLoop(
        var_block,
        from,
        till,
        increm,
        loopBody
      );
    }
  }

  ////////////////// #04 Logics Handler ///////////////////////
  handleLogic(element) {
    if (
      element.dataset.logicType == "logical-operation" ||
      element.dataset.logicType == "boolean-operation"
    ) {
      return this.handleOperators(element);
    } else if (element.dataset.logicType == "if") {
      let condition = 0;
      let body = "";

      if (element.children[0].children[1].children[0] != undefined) {
        condition = this.blocksManager(
          element.children[0].children[1].children[0]
        );
      }

      if (element.children[1].children[1].childElementCount > 0) {
        for (
          let i = 0;
          i < element.children[1].children[1].childElementCount;
          i++
        ) {
          let block = element.children[1].children[1].children[i];
          body += this.blocksManager(block, true);

          if (i + 1 < element.children[1].children[1].childElementCount) {
            body += "\n";
          }
        }
      }
      return this.languageObj.createIF(condition, body);
    } else if (element.dataset.logicType == "switch-case") {
      return "0";
    } else if (element.dataset.logicType == "not") {
      let valueBlock = 1;

      if (element.children[0].children[1].children[0] != undefined) {
        valueBlock = this.blocksManager(
          element.children[0].children[1].children[0]
        );
      }
      return this.languageObj.createNot(valueBlock);
    } else if (element.dataset.logicType == "boolean") {
      return element.children[0].children[0].options[
        element.children[0].children[0].selectedIndex
      ].text;
    }
  }

  ////////////////// #05 Texts Handler ////////////////////////
  handleText(element) {
    if (element.dataset.textType == "single-text") {
      return this.languageObj.createChar(element.children[0].value);
    } else if (element.dataset.textType == "print") {
      let valueBlock = "";
      if (element.children[0].children[1].children[0] != undefined) {
        valueBlock = this.blocksManager(
          element.children[0].children[1].children[0]
        );
      }
      if (!this.headers.includes("stdio.h")) {
        this.headers.push("stdio.h");
      }
      return this.languageObj.createPrint(valueBlock);
    }
  }

  ////////////////// #06 Procedures Handler ///////////////////
  handleProc(element) {
    if (element.dataset.procedureType == "call-void") {
      let args = "";
      if (element.children[1].childElementCount > 0) {
        for (let i = 0; i < element.children[1].childElementCount; i++) {
          let block = element.children[1].children[i];
          let to_add = "";
          if (block.children[1].childElementCount > 0) {
            let val_block = block.children[1].children[0];
            to_add = this.blocksManager(val_block);
            args += to_add + ", ";
          } else {
            args += "null, ";
          }
        }
      }
      return this.languageObj.callFunc(element.children[0].innerText, args);
    } else if (
      element.dataset.procedureType == "return" ||
      element.dataset.procedureType == "no-return"
    ) {
      let name = element.children[0].children[2].value;
      let params = element.children[0].children[4].textContent;
      let proc_body = ``;
      let proc_type = false;
      let return_value = "";

      if (element.children[1].children[0].childElementCount > 0) {
        for (
          let i = 0;
          i < element.children[1].children[0].childElementCount;
          i++
        ) {
          let block = element.children[1].children[0].children[i];
          proc_body += this.blocksManager(block, true);

          if (i + 1 < element.children[1].children[0].childElementCount) {
            proc_body += "\n";
          }
        }
      }

      if (element.dataset.procedureType != "no-return") {
        proc_type = element.children[2].children[1].value;
        return_value = element.children[2].children[2].children[0];

        if (return_value != undefined) {
          return_value = this.blocksManager(return_value);
        } else {
          if (
            proc_type == "int" ||
            proc_type == "double" ||
            proc_type == "float"
          ) {
            return_value = 0;
          } else if (proc_type == "string" || proc_type == "char") {
            return_value = "''";
          }
        }
      }
      return this.languageObj.createProc(
        name,
        params,
        proc_body,
        proc_type,
        return_value
      );
    }
  }
}

// if (!this.headers.includes('stdio')){
//     this.headers.push('stdio');
// }

// Code Appearance
const generateCodeBtn = document.querySelector(".code-generate-btn");
const codeGeneration = new BlocktoCode();

generateCodeBtn.addEventListener("click", (e) => {
  const code = codeGeneration.generateCode("c");
});
