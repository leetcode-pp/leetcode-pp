import java.lang.Math;
import java.util.*;

public class Solution {
  public int threeSumClosest(int[] nums, int target) {
    int n = nums.length;
    //if (n < 3) return;
    Arrays.sort(nums);
    int res = nums[0] + nums[1] + nums[2];
    for (int i = 0; i < n - 2; i ++) {
      if (i != 0 && nums[i] == nums[i - 1]) continue;
      int l = i + 1, r = n - 1;
      while (l < r) {
        int s = nums[i] + nums[l] + nums[r];
        if (s == target) return s;
        if (Math.abs(s - target) < Math.abs(res - target))
          res = s;
        if (s < target) l += 1;
        else if (s > target) r -= 1;
      }
    }
    return res;
  }
}
