#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
  int countNotGreater(int mid, int m, int n) {
    int cnt = 0;
    for (int i = 1; i <= m; i++)
      cnt += min(mid / i, n);
    return cnt;
  }
  int findKthNumber(int m, int n, int k) {
    int lo = 1, hi = m * n;
    while (lo < hi) {
      int mid = (lo + hi) / 2;
      if (countNotGreater(mid, m, n) < k)
        lo = mid + 1;
      else
        hi = mid;
    }
    return lo;
  }
};
