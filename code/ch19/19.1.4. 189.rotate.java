public class Solution {
  public int[] rotate(int[] nums, int k) {
    int n = nums.length, offset = k % n;
    int[] ano_nums = new int[2 * n];
    for (int i = 0; i < n; i++)
      ano_nums[i] = ano_nums[n + i] = nums[i];
    int[] ans = new int[n];
    for (int i = n - offset; i < n * 2 - offset; i++)
      ans[i - n + offset] = ano_nums[i];
    return ans;
  }
}
