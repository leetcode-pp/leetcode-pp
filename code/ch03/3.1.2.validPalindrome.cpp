class Solution {
public:
  bool isPalindrome(string s, int i, int n) {
    int l = 0;
    int r = n - 1;
    while (l < r) {
      if (l == i)
        l += 1;
      else if (r == i)
        r -= 1;
      if (s[l] != s[r])
        return false;
      l += 1;
      r -= 1;
    }
    return true;
  }
  bool validPalindrome(string s) {
    int n = s.length();
    int l = 0;
    int r = n - 1;
    while (l < r) {
      if (s[l] != s[r]) {
        return isPalindrome(s, l, n) || isPalindrome(s, r, n);
      }
      l += 1;
      r -= 1;
    }
    return true;
  }
};