import java.util.*;
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
    long i = 1;
    Set<Long> seen = new HashSet<Long>();
    while (i < (long)100000) {
      long power = (long)Math.floor(Math.log(i) / Math.log(10.0) + 0.5);
      long x = i, r = 0;
      while (x > 0) {
        r = r * (long)10 + (x % (long)10);
        x /= (long)10;
      }
      long Q = (long)(i * Math.pow(10, power) +
          r % (long)Math.pow(10, power));
      if (Long.MAX_VALUE / Q < Q) return cnt;
      Q = Q * Q;
      if (Q > Long.parseLong(R)) return cnt;
      if (Q >= Long.parseLong(L) &&
          validPalindrome(String.valueOf(Q)))
        if (!seen.contains(Q)) {
          cnt = cnt + 1;
          seen.add(Q);
        }
      Q = (long)(i * Math.pow(10, power + 1) + r);
      if (Long.MAX_VALUE / Q < Q) return cnt;
      Q = Q * Q;
      if (Q >= Long.parseLong(L) && Q <= Long.parseLong(R) &&
          validPalindrome(String.valueOf(Q)))
        if (!seen.contains(Q)) {
          cnt = cnt + 1;
          seen.add(Q);
        }
      i = i + 1;
    }
    return cnt;
  }
}
