class Solution {
  private boolean isPalindrome(String s, int i, int n) {
    int l = 0;
    int r = n - 1;
    while (l < r) {
      if (l == i) l += 1;
      else if (r == i) r -= 1;
      if (s.charAt(l) != s.charAt(r)) return false;
      l += 1;
      r -= 1;
    }
    return true;
  }

  public boolean validPalindrome(String s) {
    int n = s.length();
    int l = 0;
    int r = n - 1;
    while (l < r) {
      if (s.charAt(l) != s.charAt(r)) {
        return isPalindrome(s, l, n) || isPalindrome(s, r, n);
      }
      l += 1;
      r -= 1;
    }
    return true;
  }
}
