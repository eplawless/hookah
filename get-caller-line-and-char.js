const nthIndexOf = require('./nth-index-of');

const reLineAndChar = /[^:]*:([:\d]+)/;

module.exports = function getCallerLineAndChar(stack) {
  const idxStart = nthIndexOf(2, stack, '\n') + 1;
  if (idxStart === 0) { 
    throw new Error('unrecognized call stack format'); 
  }
  let idxEnd = stack.indexOf('\n', idxStart);
  if (idxEnd === -1) {
    idxEnd = stack.length;
  }
  const callerFrame = stack.substring(idxStart, idxEnd);
  const match = callerFrame.match(reLineAndChar);
  if (!match) { 
    throw new Error('unrecognized call stack format');
  }
  return match[1];
};
