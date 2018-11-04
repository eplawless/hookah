const areInputsIdentical = require('./are-inputs-identical');
const getCallerLineAndChar = require('./get-caller-line-and-char');

const memoTableByFunction = new WeakMap();

class MemoTableEntry {
  constructor(value, arrInputs) {
    this.value = value;
    this.arrInputs = arrInputs;
  }
  hasSameInputs(arrOtherInputs) {
    return areInputsIdentical(this.arrInputs, arrOtherInputs);
  }
}

class MemoTable {
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

function useMemo(action, arrInputs) {
  arrInputs = arrInputs || [];
  
  // ensure memoization table for caller fn
  const caller = useMemo.caller;
  let memoTable = memoTableByFunction.get(caller);
  if (!memoTable) {
    memoTable = new MemoTable();
    memoTableByFunction.set(caller, memoTable)
  }

  // get or create memoization table entry for this line number
  const stack = (new Error).stack;
  const lineAndChar = getCallerLineAndChar(stack);
  let memoTableEntry = memoTable.get(lineAndChar);
  if (!memoTableEntry) {
    const value = action();
    memoTableEntry = new MemoTableEntry(value, arrInputs);
    memoTable.set(lineAndChar, memoTableEntry);
    return value;
  }
  
  // compare existing entry's stored inputs against new inputs
  if (memoTableEntry.hasSameInputs(arrInputs)) {
    return memoTableEntry.value;
  } else {
    const value = action();
    memoTableEntry.value = value;
    memoTableEntry.arrInputs = arrInputs;
    return value;
  }
}

module.exports = useMemo;
