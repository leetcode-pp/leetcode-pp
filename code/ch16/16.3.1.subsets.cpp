class Solution {
public:
    vector<vector<int>> ans;
    vector<int> path;
    vector<vector<int>> subsets(vector<int>& nums) {
        dfs(nums, 0);
        return ans;
    }
    void dfs(vector<int>& nums, int idx) {
        if (idx == nums.size()) {
            ans.push_back(vector<int>(path));
            return;
        }
        path.push_back(nums[idx]);
        dfs(nums, idx + 1);
        path.pop_back();
        dfs(nums, idx + 1);
    }
};