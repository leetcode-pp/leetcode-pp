import java.util.*;
import java.lang.Math;

public class Solution {
  public String fractionToDecimal(long numerator,
      long denominator) {
    String res = "";
    if ((double)numerator / (double)denominator < 0.0) res = res + "-";
    numerator = Math.abs(numerator);
    denominator = Math.abs(denominator);
    long n = numerator / denominator;
    long remainder = numerator % denominator;
    res = res + String.valueOf(n);
    if (remainder == 0) return res;
    res = res + ".";
    int idx = res.length();
    Map<Long, Integer> seen = new HashMap<Long,
      Integer>();
    while (remainder != 0 && seen.get(remainder) == null) {
      seen.put(remainder, idx);
      idx = idx + 1;
      n = (remainder * 10) / denominator;
      remainder = (remainder * 10) % denominator;
      res = res + String.valueOf(n);
    }
    if (remainder != 0) {
      StringBuffer ano_str =  new StringBuffer(res);
      ano_str.insert(seen.get(remainder), "(");
      res = ano_str.toString();
      res += ")";
    }
    return res;
  }
}
