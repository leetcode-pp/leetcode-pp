class Solution {
  public boolean isPalindrome(String s, int n) {
    int l = 0;
    int r = n - 1;
    while (l < r) {
      if (s.charAt(l) != s.charAt(r)) return false;
      l += 1;
      r -= 1;
    }
    return true;
  }
}
