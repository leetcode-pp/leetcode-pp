#include <vector>
#include <set>
#include <map>
#include <algorithm>
using namespace std;

struct node {
  set<int> s;
  node() {
    s.clear();
  }
  bool operator < (const node& rhs) const {
    return s.size() > rhs.s.size();
  }
  void operator = (const node& rhs) {
    s = rhs.s;
  }
};

class Solution {
public:
  vector<int> largestDivisibleSubset(
      vector<int>& nums
      ) {
    map<int, node> S;
    S[-1] = node();
    sort(nums.begin(), nums.end());
    for (int i = 0; i < nums.size(); i++) {
      int x = nums[i];
      vector<node> temp;
      for (map<int, node>::iterator it = S.begin();
          it != S.end(); it++) {
        int d = it->first;
        if (x % d == 0) {
          S[d].s.insert(x);
          temp.push_back(S[d]);
          S[d].s.erase(x);
        }
      }
      node buf = node();
      for (int j = 0; j < temp.size(); j++)
        if (temp[j] < buf) buf = temp[j];
      if (!buf.s.count(x)) buf.s.insert(x);
      S[x] = buf;
    }
    vector<int> ans;
    node buf = node();
    for (map<int, node>::iterator it = S.begin();
        it != S.end(); it++)
      if (it->second < buf) buf = it->second;
    for (set<int>::iterator it = buf.s.begin();
        it != buf.s.end(); it++)
      ans.push_back(*it);
    return ans;
  }
};
