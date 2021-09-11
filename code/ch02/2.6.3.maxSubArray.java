import java.lang.Math;

public class Solution {
  public int maxSubArray(int[] nums) {
    int n = nums.length;
    int max_sum_ending_curr_idx = nums[0];
    int max_sum = nums[0];
    for (int i = 1; i < n; i++) {
      max_sum_ending_curr_idx = Math.max(
          max_sum_ending_curr_idx + nums[i],
          nums[i]
          );
      max_sum = Math.max(
          max_sum_ending_curr_idx,
          max_sum
          );
    }
    return max_sum;
  }
}
