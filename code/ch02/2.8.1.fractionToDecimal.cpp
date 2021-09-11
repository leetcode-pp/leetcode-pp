#include <cstdlib>
#include <cmath>
#include <string>
#include <map>
using namespace std;

typedef long long ll;

class Solution {
public:
  string fractionToDecimal(ll numerator,
      ll denominator) {
    string res("");
    if (double(numerator) / double(denominator) < 0.0) res += "-";
    numerator = llabs(numerator);
    denominator = llabs(denominator);
    ll n = numerator / denominator;
    ll remainder = numerator % denominator;
    res += to_string(n);
    if (!remainder) return res;
    res += ".";
    int idx = res.size();
    map<ll, int> seen;
    while (remainder && !seen.count(remainder)) {
      seen[remainder] = idx++;
      n = (remainder * 10LL) / denominator;
      remainder = (remainder * 10LL) % denominator;
      res += to_string(n);
    }
    if (remainder) {
      res.insert(seen[remainder], 1, '(');
      res += ")";
    }
    return res;
  }
};

