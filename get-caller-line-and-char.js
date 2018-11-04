const reLineAndChar = /[^:]*:([:\d]+)/;

module.exports = function getCallerLineAndChar(stack) {
  const callerFrame = stack.split('\n')[2];
  const match = callerFrame.match(reLineAndChar);
  if (!match) { throw new Error('didn\'t recognize call stack format'); }
  return match[1];
};
