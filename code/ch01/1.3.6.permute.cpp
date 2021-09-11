class Solution {
public:
  vector<vector<int>> ans;
  void dfs(int idx, vector<int> path, vector<int> nums, int n,
           vector<bool> visited) {
    // 结束条件
    // 1. 找到解
    if (path.size() == n) {
      vector<int> temp(path.size());
      std::copy(path.begin(), path.end(), temp.begin());
      ans.push_back(temp);
      return;
    }

    // 2. 搜索完毕
    if (idx == n)
      return;

    // 考虑可能的解，进入下一层递归
    for (int i = 0; i < n; ++i) {
      int num = nums[i];
      // 非法解忽略
      if (visited[i])
        continue;
      // 更新状态
      visited[i] = true;
      path.push_back(num);
      dfs(idx + 1, path, nums, n, visited);
      // 恢复状态
      path.pop_back();
      visited[i] = false;
    }
  }
  vector<vector<int>> permute(vector<int> &nums) {
    vector<int> path;
    vector<bool> visited(nums.size(), false);
    int n = nums.size();
    dfs(0, path, nums, n, visited);
    return ans;
  }
};
