import java.lang.Math;

public class Solution {
  public boolean validPalindrome(String s) {
    int l = 0, r = s.length() - 1;
    while (l < r) {
      if (s.charAt(l) != s.charAt(r)) return false;
      l += 1;
      r -= 1;
    }
    return true;
  }
  public int superpalindromesInRange(String L, String R) {
    int cnt = 0;
    long lbound = (long)Math.floor(Math.sqrt(Long.parseLong(L)));
    long rbound = (long)Math.ceil(Math.sqrt(Long.parseLong(R)));
    for (long i = lbound; i < rbound; i += (long)1)
      if (validPalindrome(String.valueOf(i)) &&
          validPalindrome(String.valueOf(i * i)))
        cnt = cnt + 1;
    return cnt;
  }
}
