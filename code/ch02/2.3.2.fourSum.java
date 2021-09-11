import java.util.*;
import java.lang.Math;

public class Solution {
  public List<List<Integer> > fourSum(
      int[] nums, int target
      ) {
    Arrays.sort(nums);
    List<List<Integer> > results = new ArrayList<List<Integer> >();
    List<Integer> tempList = new ArrayList<>();
    findNsum(nums, target, 4, tempList, results);
    return results;
  }
  void findNsum(int[] nums, int target, int N,
      List<Integer> tempList,
      List<List<Integer> > results) {
    if (nums.length < N || N < 2) return;
    if (N == 2) {
      int l = 0, r = nums.length - 1;
      while (l < r) {
        if (nums[l] + nums[r] == target) {
          List<Integer> bufList = new ArrayList<>();
          for (int ww = 0; ww < tempList.size(); ww++)
            bufList.add(tempList.get(ww));
          bufList.add(nums[l]);
          bufList.add(nums[r]);
          results.add(bufList);
          l += 1;
          r -= 1;
          while (l < r && nums[l] == nums[l - 1])
            l += 1;
          while (r > l && nums[r] == nums[r + 1])
            r -= 1;
        }
        else if (nums[l] + nums[r] < target) l += 1;
        else r -= 1;
      }
    } else {
      for (int i = 0; i < nums.length; i++)
        if (i == 0 || i > 0 && nums[i - 1] != nums[i]) {
          int[] buf_nums = new int[nums.length - i - 1];
          for (int j = i + 1; j < nums.length; j++)
            buf_nums[j - i - 1] = nums[j];
          List<Integer> bufList = new ArrayList<>();
          for (int ww = 0; ww < tempList.size(); ww++)
            bufList.add(tempList.get(ww));
          bufList.add(nums[i]);
          findNsum(buf_nums, target - nums[i], N - 1,
              bufList, results);
        }
    }
  }
}
