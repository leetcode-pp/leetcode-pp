class Solution {
public:
  vector<int> twoSum(vector<int> &nums, int target) {

    unordered_map<int, int> mapper;

    for (int i = 0; i < nums.size(); i++) {
      if (mapper.find(target - nums[i]) != mapper.end())
        return {mapper[target - nums[i]], i};

      mapper[nums[i]] = i;
    }
    return {};
  }
};