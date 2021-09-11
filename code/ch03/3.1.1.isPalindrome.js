function isPalindrome(s, n) {
  let l = 0
  let r = n - 1
  while (l < r) {
    if (s[l] !== s[r]) return false
    l += 1
    r -= 1
  }
  return true
}
