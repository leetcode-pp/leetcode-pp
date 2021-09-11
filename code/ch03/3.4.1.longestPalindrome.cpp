#include <string>
using namespace std;

class Solution {
public:
  string extend(int i, int j, string s) {
    while (i >= 0 && j < s.length() && s[i] == s[j]) {
      i -= 1;
      j += 1;
    }
    return s.substr(i + 1, j - i - 1);
  }
  string longestPalindrome(string s) {
    int n = s.length();
    if (n == 0) return "";
    string res = s.substr(0, 1);
    for (int i = 0; i < n - 1; i++) {
      string e1 = extend(i, i, s);
      string e2 = extend(i, i + 1, s);
      if (max(e1.length(), e2.length()) > res.length())
        res = ((e1.length() > e2.length()) ? e1 : e2);
    }
    return res;
  }
};
