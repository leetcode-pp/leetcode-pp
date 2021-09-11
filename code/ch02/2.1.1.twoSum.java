class Solution {
  public int[] twoSum(int[] nums, int target) {
    int n = nums.length;
    Arrays.sort(nums);
    int l = 0;
    int r = n - 1;
    while (l < r) {
      if (nums[l] + nums[r] < target) {
        l += 1;
      } else if (nums[l] + nums[r] > target) {
        r -= 1;
      } else {
        return new int[] {l, r};
      }
    }
    return new int[] {};
  }
}
