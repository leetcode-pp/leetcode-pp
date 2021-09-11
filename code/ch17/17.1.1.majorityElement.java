import java.util.*;

public class Solution {
  public List<Integer> majaorityElement(int[] nums) {
    int n = nums.length;
    List<Integer> res = new ArrayList<>();
    int cnt1 = 0, cnt2 = 0, n1, n2;
    boolean n1_init = false, n2_init = false;
    for (int i = 0; i < nums.length; i++) {
      if (!n1_init) {
        n1 = nums[i];
        n1_init = true;
        cnt1 += 1;
      }
      else if (nums[i] == n1) cnt1 += 1;
      else if (!n2_init) {
        n2 = nums[i];
        n2_init = true;
        cnt2 += 1;
      }
      else if (nums[i] == n2) cnt2 += 1;
      else if (cnt1 == 0) {
        n1 = nums[i];
        cnt1 += 1;
      }
      else if (cnt2 == 0) {
        n2 = nums[i];
        cnt2 += 1;
      } else {
        cnt1 -= 1;
        cnt2 -= 1;
      }
    }
    cnt1 = 0;
    cnt2 = 0;
    for (int i = 0; i < nums.length; i++) {
      if (nums[i] == n1) cnt1 += 1;
      if (nums[i] == n2) cnt2 += 1;
    }
    if (cnt1 > n / 3) res.add(n1);
    if (cnt2 > n / 3) res.add(n2);
    return res;
  }
}
