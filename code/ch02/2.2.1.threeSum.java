class Solution {
  public List<List<Integer>> threeSum(int[] nums) {
    int n = nums.length;
    Arrays.sort(nums);
    List<List<Integer>> res = new ArrayList<>();

    for (int i = 0; i < n - 2; i++) {
      if (i > 0 && nums[i] == nums[i - 1]) continue;
      int l = i + 1;
      int r = n - 1;
      while (l < r) {
        if (nums[i] + nums[l] + nums[r] < 0) {
          l += 1;
        } else if (nums[i] + nums[l] + nums[r] > 0) {
          r -= 1;
        } else {
          res.add(new ArrayList<Integer>(Arrays.asList(nums[i], nums[l], nums[r])));
          while (l < r && nums[l] == nums[l + 1]) {
            l += 1;
          }
          while (l < r && nums[r] == nums[r - 1]) {
            r -= 1;
          }
          l += 1;
          r -= 1;
        }
      }
    }
    return res;
  }
}
