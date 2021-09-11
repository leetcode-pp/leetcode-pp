class Solution {
    List<List<Integer>> ans = new ArrayList<>();
    Set<Integer> visited = new HashSet<>();
    public List<List<Integer>> permute(int[] nums) {
        dfs(new ArrayList<>(), nums);
        return ans;
    }
    public void dfs(List<Integer> path, int[] nums) {
        if (path.size() == nums.length) {
            ans.add(new ArrayList<>(path));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (!visited.contains(i)) {
                visited.add(i);
                path.add(nums[i]);
                dfs(path, nums);
                path.remove(path.size() - 1);
                visited.remove(i);
            }
        }
    }
}