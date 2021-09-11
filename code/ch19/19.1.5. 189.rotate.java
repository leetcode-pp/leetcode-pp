public class Solution {
  public void reverse(int[] arr, int start, int end) {
    while (start < end) {
      int t = arr[start];
      arr[start] = arr[end];
      arr[end] = t;
      start += 1;
      end -= 1;
    }
  }
  public void rotate(int[] nums, int k) {
    int n = nums.length, offset = k % n;
    if (offset == 0) return;
    reverse(nums, 0, n - offset - 1);
    reverse(nums, n - offset, n - 1);
    reverse(nums, 0, n - 1);
  }
}
