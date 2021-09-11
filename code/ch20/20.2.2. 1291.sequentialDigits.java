import java.util.*;

public class Solution {
  public int lower_bound(List<Integer> arr, int first,
      int last, int value) {
    while (first < last) {
      int mid = first + (last - first) / 2;
      if (arr.get(mid) < value) first = mid + 1;
      else last = mid;
    }
    return first;
  }
  public int upper_bound(List<Integer> arr, int first,
      int last, int value) {
    while (first < last) {
      int mid = first + (last - first) / 2;
      if (arr.get(mid) <= value) first = mid + 1;
      else last = mid;
    }
    return first;
  }
  List<Integer> sequentialDigits(int low, int high) {
    String numbers = "123456789";
    List<Integer> ins = new ArrayList<>();
    int n = numbers.length();
    for (int i = 1; i < n; i++)
      for (int j = 0; j < n - i; j++)
        ins.add(Integer.parseInt(numbers.substring(
                j, i + j + 1
                )));
    int st = lower_bound(ins, 0, ins.size(), low);
    int ed = upper_bound(ins, 0, ins.size(), high);
    List<Integer> ans = new ArrayList<>();
    for (; st != ed; st++)
      ans.add(ins.get(st));
    return ans;
  }
}
