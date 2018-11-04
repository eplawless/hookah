module.exports = function nthIndexOf(n, str, substring) {
  let idx = -1;
  let count = 0;
  while (count < n) {
    idx = str.indexOf(substring, idx + 1);
    if (idx === -1) { break; }
    ++count;
  }
  return idx;
};
