import java.util.*;

public class Solution {
  public class my_str {
    public String str;
    public void setStr(int num) {
        Integer buf_num = new Integer(num);
        this.str = buf_num.toString();
    }
  }
  public class my_cmp implements Comparator<my_str> {
    @Override
    public int compare(my_str a, my_str b) {
      if (a != null && b != null) {
        String left = a.str + b.str;
        String right = b.str + a.str;
        return right.compareTo(left);
      }
      return 0;
    }
  }
  String largestNumber(int[] nums) {
    my_str[] s;
    s = new my_str[nums.length];
    for (int i = 0; i < nums.length; i++) {
        s[i] = new my_str();
        s[i].setStr(nums[i]);
    }
    Arrays.sort(s, new my_cmp());
    String ans = "";
    for (int i = 0; i < nums.length; i++)
      if (s[i] != null) ans = ans + s[i].str;
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
