/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(s) {
  function isPalindrome(s, i, n) {
    let l = 0;
    let r = n - 1;
    while (l < r) {
      if (l == i) l += 1;
      else if (r == i) r -= 1;
      if (s.charAt(l) != s.charAt(r)) return false;
      l += 1;
      r -= 1;
    }
    return true;
  }

  let n = s.length;
  let l = 0;
  let r = n - 1;
  while (l < r) {
    if (s.charAt(l) != s.charAt(r)) {
      return isPalindrome(s, l, n) || isPalindrome(s, r, n);
    }
    l += 1;
    r -= 1;
  }
  return true;
};
