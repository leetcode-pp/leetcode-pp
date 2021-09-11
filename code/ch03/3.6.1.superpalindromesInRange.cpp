#include <cmath>
#include <cstdlib>
#include <string>
using namespace std;

typedef long long ll;

class Solution {
public:
  bool validPalindrome(string s) {
    int l = 0, r = s.length() - 1;
    while (l < r) {
      if (s[l] != s[r]) return false;
      l += 1;
      r -= 1;
    }
    return true;
  }
  int superpalindromesInRange(string L, string R) {
    int cnt = 0;
    ll l_num = 0LL, r_num = 0LL;
    for (int i = 0; i < L.length(); i++)
      l_num = (l_num * 10LL) + ll(L[i] - '0');
    for (int i = 0; i < R.length(); i++)
      r_num = (r_num * 10LL) + ll(R[i] - '0');
    for (ll i = ll(floor(sqrt(double(l_num))));
        i < ll(ceil(sqrt(double(r_num)))); i += 1LL)
      if (validPalindrome(to_string(i)) && \
          validPalindrome(to_string(i * i))) cnt += 1;
    return cnt;
  }
};
