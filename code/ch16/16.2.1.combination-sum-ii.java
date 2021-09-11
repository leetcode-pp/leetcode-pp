class Solution {
    List<List<Integer>> ans = new ArrayList<>();
    Set<Integer> visited = new HashSet<>();
    List<Integer> path = new ArrayList<>();
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
        dfs(candidates, 0, target);
        return ans;
    }
    public void dfs(int[] candidates, int idx, int cur) {
        if (cur == 0) {
            ans.add(new ArrayList<>(path));
            return;
        } else if (idx == candidates.length) {
            return;
        }
        // 当前数字与前面数字相同并且前面数字没有在路径中，则忽略这个数字
        if (idx != 0 && candidates[idx] == candidates[idx - 1] && !visited.contains(idx - 1)) {
            dfs(candidates, idx + 1, cur);
            return;
        }
        // 1.加入这个数字
        if (candidates[idx] <= cur) {
            path.add(candidates[idx]);
            visited.add(idx);
            // 向下递归时考虑下一个数字
            dfs(candidates, idx + 1, cur - candidates[idx]);
            // 消除影响
            path.remove(path.size() - 1);
            visited.remove(idx);
        }
        // 2.不加入这个数字
        dfs(candidates, idx + 1, cur);
    }
}