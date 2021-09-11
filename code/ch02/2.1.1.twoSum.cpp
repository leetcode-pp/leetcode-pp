class Solution {
public:
  vector<int> twoSum(vector<int> &nums, int target) {
    int n = nums.size();
    sort(nums.begin(), nums.end());
    int l = 0;
    int r = n - 1;
    while (l < r) {
      if (nums[l] + nums[r] < target) {
        l += 1;
      } else if (nums[l] + nums[r] > target) {
        r -= 1;
      } else {
        return {l, r};
      }
    }
    return {};
  }
};