#include <queue>
#include <vector>
#include <algorithm>
using namespace std;

class KthLargest {
public:
  priority_queue<int, vector<int>, less<int> > qlarge;
  priority_queue<int, vector<int>, greater<int> > qsmall;
  int k;
  KthLargest(int buf_k, vector<int>& nums) {
    while (!qlarge.empty()) qlarge.pop();
    while (!qsmall.empty()) qsmall.pop();
    k = buf_k;
    for (int i = 0; i < nums.size(); i++)
      qlarge.push(nums[i]);
    while (qsmall.size() < k - 1) {
      qsmall.push(qlarge.top());
      qlarge.pop();
    }
  }
  int add(int val) {
    int cmp;
    if (k > 1) cmp = qsmall.top();
    else {
      qlarge.push(val);
      return qlarge.top();
    }
    if (cmp < val) {
      qsmall.pop();
      qsmall.push(val);
      qlarge.push(cmp);
    } else {
      qlarge.push(val);
    }
    return qlarge.top();
  }
};
