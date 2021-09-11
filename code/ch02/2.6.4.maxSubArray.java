import java.lang.Math;

public class Solution {
  public int maxSubArray(int[] nums) {
    int n = nums.length;
    int maxSum = nums[0], minSum = 0, sum = 0;
    for (int i = 0; i < n; i++) {
      sum += nums[i];
      maxSum = Math.max(maxSum, sum - minSum);
      minSum = Math.min(minSum, sum);
    }
    return maxSum;
  }
}
