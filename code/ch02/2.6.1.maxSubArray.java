import java.lang.Math;

public class Solution {
  public int maxSubArray(int[] nums) {
    int n = nums.length;
    int maxSum = -0x7fffffff, total = 0;
    for (int i = 0; i < n; i++) {
      total = 0;
      for (int j = i; j < n; j++) {
        total += nums[j];
        maxSum = Math.max(maxSum, total);
      }
    }
    return maxSum;
  }
}
