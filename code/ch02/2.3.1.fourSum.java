class Solution {
  private void backtrack(
      List<List<Integer>> res,
      int[] nums,
      int n,
      List<Integer> tempList,
      int remain,
      int start,
      HashSet set) {
    if (tempList.size() > 4) {
      return;
    }
    if (remain == 0 && tempList.size() == 4) {
      if (set.contains(tempList.toString())) {
        return;
      } else {
        set.add(tempList.toString());
        res.add(new ArrayList<Integer>(tempList));
        return;
      }
    }
    for (int i = start; i < n; i++) {
      tempList.add(nums[i]);
      backtrack(res, nums, n, tempList, remain - nums[i], i + 1, set);
      tempList.remove(tempList.size() - 1);
    }
  }

  public List<List<Integer>> fourSum(int[] nums, int target) {
    List<List<Integer>> res = new ArrayList<>();
    HashSet set = new HashSet();
    Arrays.sort(nums);
    List<Integer> tempList = new ArrayList<Integer>();
    backtrack(res, nums, nums.length, tempList, target, 0, set);
    return res;
  }
}
