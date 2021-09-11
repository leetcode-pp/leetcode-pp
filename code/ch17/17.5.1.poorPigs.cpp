#include <cstdlib>
#include <cmath>

class Solution {
public:
  int poorPigs(int buckets, int minutesToDie,
      int minutesToTest) {
    int cnt = 0;
    while (pow(minutesToTest / minutesToDie + 1, cnt) <\
        buckets)
      cnt += 1;
    return cnt;
  }
};
