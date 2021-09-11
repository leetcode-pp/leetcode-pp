public class Solution {
  public void rotate(int[] nums, int k) {
    int n = nums.length, t, offset = n - k % n;
    if (offset == 0) return;
    while (offset != 0) {
      t = nums[0];
      offset -= 1;
      for (int i = 0; i < n - 1; i++)
        nums[i] = nums[i + 1];
      nums[n - 1] = t;
    }
  }
}
