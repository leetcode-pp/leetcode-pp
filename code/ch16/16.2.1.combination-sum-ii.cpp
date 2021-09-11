class Solution {
public:
    vector<vector<int>> ans;
    set<int> visited;
    vector<int> path;
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        dfs(candidates, 0, target);
        return ans;
    }
    void dfs(vector<int>& candidates, int idx, int cur) {
        if (cur == 0) {
            ans.push_back(vector<int>(path));
            return;
        } else if (idx == candidates.size()) {
            return;
        }
        // 当前数字与前面数字相同并且前面数字没有在路径中，则忽略这个数字
        if (idx != 0 && candidates[idx] == candidates[idx - 1] && !visited.count(idx - 1)) {
            dfs(candidates, idx + 1, cur);
            return;
        }
        // 1.加入这个数字
        if (candidates[idx] <= cur) {
            path.push_back(candidates[idx]);
            visited.insert(idx);
            // 向下递归时考虑下一个数字
            dfs(candidates, idx + 1, cur - candidates[idx]);
            // 消除影响
            path.pop_back();
            visited.erase(idx);
        }
        // 2.不加入这个数字
        dfs(candidates, idx + 1, cur);
    }
};