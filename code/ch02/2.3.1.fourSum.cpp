
class Solution {
public:
  vector<vector<int>> res;
  set<string> set;
  void backtrack(vector<int> &nums, int n, vector<int> tempList, int remain,
                 int start) {
    if (tempList.size() > 4) {
      return;
    }
    if (remain == 0 && tempList.size() == 4) {
      stringstream ss;
      copy(tempList.begin(), tempList.end(), ostream_iterator<int>(ss, ""));
      string s = ss.str();
      if (set.count(s) != 0) {
        return;
      } else {
        set.insert(s);
        vector<int> copy;
        copy.assign(tempList.begin(), tempList.end());
        res.push_back(copy);
        return;
      }
    }
    for (int i = start; i < n; i++) {
      tempList.push_back(nums[i]);
      backtrack(nums, n, tempList, remain - nums[i], i + 1);
      tempList.pop_back();
    }
  }
  vector<vector<int>> fourSum(vector<int> &nums, int target) {
    sort(nums.begin(), nums.end());
    vector<int> tempList;
    backtrack(nums, nums.size(), tempList, target, 0);
    return res;
  }
};