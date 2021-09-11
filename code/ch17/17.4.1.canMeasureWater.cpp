#include <utility>
#include <set>
#include <queue>
#include <algorithm>
using namespace std;

class Solution {
public:
  bool canMeasureWater(int x, int y, int z) {
    if (x + y < z) return false;
    queue<pair<int, int> > q;
    q.push(make_pair(0, 0));
    set<pair<int, int> > seen;
    seen.insert(make_pair(0, 0));
    while (q.size()) {
      pair<int, int> buf = q.front();
      q.pop();
      int a = buf.first, b = buf.second;
      if (a == z || b == z || a + b == z) return true;
      set<pair<int, int> > states;
      states.insert(make_pair(x, b));
      states.insert(make_pair(a, y));
      states.insert(make_pair(0, b));
      states.insert(make_pair(a, 0));
      int val = ((b < x - a) ? 0 : (b - (x - a)));
      states.insert(make_pair(min(x, b + a), val));
      val = ((a + b < y) ? 0 : (a - (y - b)));
      states.insert(make_pair(val, min(b + a, y)));
      for (set<pair<int, int> >::iterator it = \
          states.begin(); it != states.end(); it++) {
        if (seen.count(*it)) continue;
        q.push(*it);
        seen.insert(*it);
      }
    }
    return false;
  }
};
