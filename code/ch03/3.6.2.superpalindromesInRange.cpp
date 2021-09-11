#include <map>
#include <string>
#include <cmath>
#include <cstdlib>
#include <iostream>
#include <limits.h>
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
    ll i = 1;
    map<ll, bool> seen;
    seen.clear();
    while (i < 100000LL) {
      ll power = ll(floor(log(i) / log(10.0) + 0.5));
      ll x = i, r = 0;
      while (x > 0LL) {
        r = r * 10LL + (x % 10LL);
        x /= 10LL;
      }
      ll Q = ll(i * pow(10, power) + \
          r % ll(pow(10, power)));
      if (LLONG_MAX / Q < Q) return cnt;
      Q = Q * Q;
      ll l_num = 0LL, r_num = 0LL;
      for (int ww = 0; ww < L.size(); ww++)
        l_num = (l_num * 10LL) + ll(L[ww] - '0');
      for (int ww = 0; ww < R.size(); ww++)
        r_num = (r_num * 10LL) + ll(R[ww] - '0');
      if (Q > r_num) return cnt;
      if (Q >= l_num && validPalindrome(to_string(Q)))
        if (!seen.count(Q)) {
          cnt += 1;
          seen[Q] = true;
        }
      Q = i * pow(10, power + 1LL) + r;
      if (LLONG_MAX / Q < Q) return cnt;
      Q = Q * Q;
      if (Q >= l_num && Q <= r_num && validPalindrome(to_string(Q)))
        if (!seen.count(Q)) {
          cnt += 1;
          seen[Q] = true;
        }
      i += 1LL;
    }
    return cnt;
  }
};
