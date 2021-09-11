#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
  vector<vector<int> > fourSum(vector<int>& nums,
      int target) {
    sort(nums.begin(), nums.end());
    vector<vector<int> > results;
    vector<int> tempList;
    findNsum(nums, target, 4, tempList, results);
    return results;
  }
  void findNsum(vector<int> nums, int target, int N,
      vector<int> tempList,
      vector<vector<int> >& results) {
    if (nums.size() < N || N < 2) return;
    if (N == 2) {
      int l = 0, r = nums.size() - 1;
      while (l < r) {
        if (nums[l] + nums[r] == target) {
          vector<int> bufList = tempList;
          bufList.push_back(nums[l]);
          bufList.push_back(nums[r]);
          results.push_back(bufList);
          l += 1;
          r -= 1;
          while (l < r && nums[l] == nums[l - 1])
            l += 1;
          while (r > l && nums[r] == nums[r + 1])
            r -= 1;
        }
        else if (nums[l] + nums[r] < target) l += 1;
        else r -= 1;
      }
    } else {
      for (int i = 0; i < nums.size(); i++)
        if (i == 0 || i > 0 && nums[i - 1] != nums[i]) {
          vector<int> buf_nums;
          for (int j = i + 1; j < nums.size(); j++)
            buf_nums.push_back(nums[j]);
          vector<int> bufList = tempList;
          bufList.push_back(nums[i]);
          findNsum(buf_nums, target - nums[i],
              N - 1, bufList, results);
        }
    }
  }
};
