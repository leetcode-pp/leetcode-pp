class Solution {
public:
    vector<vector<int>> ans;
    vector<int> path;
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        dfs(candidates, 0, target);
        return ans;
    }
    void dfs(vector<int>& candidates, int idx, int cur) {
        // 递归结束
        if (cur == 0) {
            // 克隆 path 并添加到 ans
            ans.push_back(vector<int>(path));
            return;
        } else if (idx == candidates.size()) {
            return;
        }
        // 1.加入这个数字
        if (candidates[idx] <= cur) {
            path.push_back(candidates[idx]);
            // idx 不变，继续考虑当前数字
            dfs(candidates, idx, cur - candidates[idx]);
            // 消除影响
            path.pop_back();
        }
        // 2.不加入这个数字，考虑下一个数字
        dfs(candidates, idx + 1, cur);
    }
};