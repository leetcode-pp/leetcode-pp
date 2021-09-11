import java.lang.Math;

public class Solution {
  public int helper(int[] nums, int l, int r) {
    if (l > r) return -0x7fffffff;
    int mid = (l + r) / 2;
    int left = helper(nums, l, mid - 1);
    int right = helper(nums, mid + 1, r);
    int left_suffix_max_sum = 0;
    int right_prefix_max_sum = 0;
    int total = 0;
    for (int i = mid - 1; i >= l; i--) {
      total += nums[i];
      left_suffix_max_sum = Math.max(left_suffix_max_sum,
          total);
    }
    total = 0;
    for (int i = mid + 1; i < r + 1; i ++) {
      total += nums[i];
      right_prefix_max_sum = Math.max(right_prefix_max_sum,
          total);
    }
    int cross_max_sum = left_suffix_max_sum
      + right_prefix_max_sum
      + nums[mid];
    return Math.max(cross_max_sum, Math.max(left, right));
  }
  public int maxSubArray(int[] nums) {
    return helper(nums, 0, nums.length - 1);
  }
}
