#include <iostream>
#include <string>

bool isPalindrome(std::string s, int n) {
  int l = 0;
  int r = n - 1;
  while (l < r) {
    if (s[l] != s[r])
      return false;
    l += 1;
    r -= 1;
  }
  return true;
}
