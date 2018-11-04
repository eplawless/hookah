module.exports = function areInputsIdentical(arrInputs, arrOtherInputs) {
  if (!Array.isArray(arrInputs) || !Array.isArray(arrOtherInputs)) {
    throw new TypeError('expected inputs to be an array');
  }
  if (arrInputs.length !== arrOtherInputs.length) { return false; }
  for (let idx = 0; idx < arrInputs.length; ++idx) {
    if (arrInputs[idx] !== arrOtherInputs[idx]) {
      return false;
    }
  }
  return true;
};
