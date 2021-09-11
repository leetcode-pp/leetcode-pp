class Solution {
    List<List<Integer>> ans = new ArrayList<>();
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        dfs(candidates, 0, target, new ArrayList<>());
        return ans;
    }
    public void dfs(int[] candidates, int idx, int cur, List<Integer> path) {
        // 递归结束
        if (cur == 0) {
            // 克隆 path 并添加到 ans
            ans.add(new ArrayList<>(path));
            return;
        } else if (idx == candidates.length) {
            return;
        }
        // 1.加入这个数字
        if (candidates[idx] <= cur) {
            path.add(candidates[idx]);
            // idx 不变，继续考虑当前数字
            dfs(candidates, idx, cur - candidates[idx], path);
            // 消除影响
            path.remove(path.size() - 1);
        }
        // 2.不加入这个数字，考虑下一个数字
        dfs(candidates, idx + 1, cur, path);
    }
}