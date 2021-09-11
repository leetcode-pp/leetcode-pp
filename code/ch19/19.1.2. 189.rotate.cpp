#include <vector>
using namespace std;

class Solution {
public:
  void rotate(vector<int>& nums, int k) {
    vector<int> copy = nums;
    int n = nums.size();
    if (k % n == 0) return;
    for (int i = 0; i < n; i++)
      nums[(k + i) % n] = copy[i];
  }
};
