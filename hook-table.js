const areInputsIdentical = require('./are-inputs-identical');
const getCallerLineAndChar = require('./get-caller-line-and-char');

const hookTableByFunction = new WeakMap();

class HookTableEntry {
  constructor(value, arrInputs) {
    this.value = value;
    this.arrInputs = arrInputs;
  }
  update(value, arrInputs) {
    this.value = value;
    this.arrInputs = arrInputs;
  }
  hasSameInputs(arrOtherInputs) {
    return areInputsIdentical(this.arrInputs, arrOtherInputs);
  }
}

class HookTable {
  constructor() {
    this.entryByLineAndChar = {};
  }
  get(lineAndChar) {
    return this.entryByLineAndChar[lineAndChar];
  }
  set(lineAndChar, entry) {
    this.entryByLineAndChar[lineAndChar] = entry;
  }
}

module.exports = {
  getEntry(caller, stack) {
    // ensure hook table for caller fn
    let hookTable = hookTableByFunction.get(caller);
    if (!hookTable) {
      hookTable = new HookTable();
      hookTableByFunction.set(caller, hookTable)
    }

    // get or create hook table entry for this line number
    const lineAndChar = getCallerLineAndChar(stack);
    let hookTableEntry = hookTable.get(lineAndChar);
    if (!hookTableEntry) {
      hookTableEntry = new HookTableEntry(undefined, []);
      hookTable.set(lineAndChar, hookTableEntry);
    }
    return hookTableEntry;
  }
};
