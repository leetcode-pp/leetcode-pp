import java.util.*;

class Solution {
  public List<Integer> sequentialDigits(int low, int high) {
    String numbers = "123456789";
    List<Integer> ins = new ArrayList<>();
    int n = numbers.length();
    for (int i = 1; i < n; i++)
      for (int j = 0; j < n - i; j++)
        ins.add(Integer.parseInt(numbers.substring(
                j, i + j + 1
                )));
    List<Integer> ans = new ArrayList<>();
    for (int i = 0; i < ins.size(); i++)
      if (ins.get(i) >= low && ins.get(i) <= high)
        ans.add(ins.get(i));
    return ans;
  }
}
