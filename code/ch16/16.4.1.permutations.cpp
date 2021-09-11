class Solution {
public:
    vector<vector<int>> ans;
    vector<int> path;
    set<int> visited;
    vector<vector<int>> permute(vector<int>& nums) {
        dfs(nums);
        return ans;
    }
    void dfs(vector<int>& nums) {
        if (path.size() == nums.size()) {
            ans.push_back(vector<int>(path));
            return;
        }
        for (int i = 0; i < nums.size(); i++) {
            if (!visited.count(i)) {
                visited.insert(i);
                path.push_back(nums[i]);
                dfs(nums);
                path.pop_back();
                visited.erase(i);
            }
        }
    }
};