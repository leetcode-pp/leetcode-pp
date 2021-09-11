#include <algorithm>
using namespace std;

class Solution {
public:
  int gcd(int a, int b) {
    int smaller = min(a, b);
    while (smaller) {
      if (a % smaller == 0 && b % smaller == 0)
        return smaller;
      smaller -= 1;
    }
  }
  bool canMeasureWater(int x, int y, int z) {
    if (x + y < z) return false;
    if (z == 0) return true;
    if (x == 0) return y == z;
    if (y == 0) return x == z;
    return z % gcd(x, y) == 0;
  }
};
