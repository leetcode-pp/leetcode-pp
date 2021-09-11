import java.util.*;

public class Solution {
  public String largestNumber(int[] nums) {
    String[] s = new String[nums.length];
    for (int i = 0; i < nums.length; i++)
      s[i] = String.valueOf(nums[i]);
    List<String> str = Arrays.asList(s);
    str.sort((String a, String b) -> {
      String left = a + b, right = b + a;
      return right.compareTo(left);
    });
    String ans = "";
    for (int i = 0; i < nums.length; i++)
      ans = ans + str.get(i);
    String real_ans = "";
    boolean flag = false;
    for (int i = 0; i < ans.length(); i++) {
      if (!flag) flag = !(ans.charAt(i) == '0');
      if (flag) real_ans = real_ans + ans.substring(i, i + 1);
    }
    if (!flag) return "0";
    else return real_ans;
  }
}
