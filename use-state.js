const hookTable = require('./hook-table');

function useState(initialState) {
  const caller = useState.caller;
  const stack = (new Error).stack;
  const hookTableEntry = hookTable.getEntry(caller, stack);

  if (hookTableEntry.value === undefined) {
    const stateTuple = [undefined, setState];
    hookTableEntry.value = stateTuple;
    setState(initialState);
    function setState(newState) {
      if (typeof newState === 'function') {
        stateTuple[0] = newState(stateTuple[0]);
      } else {
        stateTuple[0] = newState;
      }
    }
  }

  return hookTableEntry.value;
}

module.exports = useState;
