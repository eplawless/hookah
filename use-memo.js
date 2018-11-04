const hookTable = require('./hook-table');

function useMemo(action, arrInputs) {
  arrInputs = arrInputs || [];

  const caller = useMemo.caller;
  const stack = (new Error).stack;
  const hookTableEntry = hookTable.getEntry(caller, stack);

  if (arrInputs.length > 0 && hookTableEntry.hasSameInputs(arrInputs)) {
    return hookTableEntry.value;
  } else {
    const value = action();
    hookTableEntry.update(value, arrInputs);
    return value;
  }
}

module.exports = useMemo;
