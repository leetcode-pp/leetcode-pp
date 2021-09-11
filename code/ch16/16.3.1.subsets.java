class Solution {
    List<List<Integer>> ans = new ArrayList<>();
    public List<List<Integer>> subsets(int[] nums) {
        dfs(nums, 0, new ArrayList<>());
        return ans;
    }
    public void dfs(int[] nums, int idx, List<Integer> path) {
        if (idx == nums.length) {
            ans.add(new ArrayList<>(path));
            return;
        }
        path.add(nums[idx]);
        dfs(nums, idx + 1, path);
        path.remove(path.size() - 1);
        dfs(nums, idx + 1, path);
    }
}