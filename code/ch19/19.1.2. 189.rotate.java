public class Solution {
  public void rotate(int[] nums, int k) {
    int[] copy = new int[nums.length];
    int n = nums.length;
    for (int i = 0; i < n; i++) copy[i] = nums[i];
    if (k % n == 0) return;
    for (int i = 0; i < n; i++)
      nums[(k + i) % n] = copy[i];
  }
}
