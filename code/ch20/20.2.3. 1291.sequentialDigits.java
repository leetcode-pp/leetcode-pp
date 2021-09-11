import java.util.*;

public class Solution {
  public int lower_bound(int[] arr, int first, int last,
      int value) {
    while (first < last) {
      int mid = first + (last - first) / 2;
      if (arr[mid] < value) first = mid + 1;
      else last = mid;
    }
    return first;
  }
  public int upper_bound(int[] arr, int first, int last,
      int value) {
    while (first < last) {
      int mid = first + (last - first) / 2;
      if (arr[mid] <= value) first = mid + 1;
      else last = mid;
    }
    return first;
  }
  public List<Integer> sequentialDigits(int low, int high) {
    int[] ins = {
            12,
            23,
            34,
            45,
            56,
            67,
            78,
            89,
            123,
            234,
            345,
            456,
            567,
            678,
            789,
            1234,
            2345,
            3456,
            4567,
            5678,
            6789,
            12345,
            23456,
            34567,
            45678,
            56789,
            123456,
            234567,
            345678,
            456789,
            1234567,
            2345678,
            3456789,
            12345678,
            23456789,
            123456789
    };
    int st = lower_bound(ins, 0, ins.length, low);
    int ed = upper_bound(ins, 0, ins.length, high);
    List<Integer> ans = new ArrayList<>();
    for (int i = st; i != ed; i++)
      ans.add(ins[i]);
    return ans;
  }
}
