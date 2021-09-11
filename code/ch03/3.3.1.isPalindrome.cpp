class Solution {
public:
  bool isPalindrome(int x) {
    if (x < 0) return false;
    if (x == 0) return true;
    if (x % 10 == 0) return false;
    int res = 0, copy = x;
    while (x > 0) {
      res = res * 10 + (x % 10);
      x /= 10;
    }
    return copy == res;
  }
};
