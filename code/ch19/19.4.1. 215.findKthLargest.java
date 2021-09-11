import java.util.*;

public class Solution {
  public int locate(int[] arr, int st, int ed, int idx) {
    if (st == ed) return arr[st];
    Random r = new Random();
    int rd = st + r.nextInt(ed - st + 1);
    int tmp = arr[rd];
    arr[rd] = arr[ed];
    arr[ed] = tmp;
    int now = st;
    for (int i = st; i < ed; i++)
      if (arr[i] < arr[ed]) {
        tmp = arr[i];
        arr[i] = arr[now];
        arr[now] = tmp;
        now += 1;
      }
    tmp = arr[now];
    arr[now] = arr[ed];
    arr[ed] = tmp;
    if (now == st + idx) return arr[now];
    else if (now < st + idx)
      return locate(arr, now + 1, ed,
          idx - (now - st) - 1);
    else return locate(arr, st, now - 1, idx);
  }
  int findKthLargest(int[] nums, int k) {
    return locate(nums, 0, nums.length - 1,
        nums.length - k);
  }
}
