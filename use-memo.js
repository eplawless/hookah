const memoTableByFunction = new WeakMap();

class MemoTableEntry {
  constructor(value, arrInputs) {
    this.value = value;
    this.arrInputs = arrInputs;
  }
  hasSameInputs(arrOtherInputs) {
    const arrInputs = this.arrInputs;
    if (arrInputs.length !== arrOtherInputs.length) { return false; }
    for (let idx = 0; idx < arrInputs.length; ++idx) {
      if (arrInputs[idx] !== arrOtherInputs[idx]) {
        return false;
      }
    }
    return true;
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

const reLineAndChar = /[^:]*:([:\d]+)/;

function getCallerLineAndChar(stack) {
  const callerFrame = stack.split('\n')[2];
  const match = callerFrame.match(reLineAndChar);
  if (!match) { throw new Error('didn\'t recognize call stack format'); }
  return match[1];
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
