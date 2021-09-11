import java.util.*;
import java.lang.Math;

class Solution {
  public int maxFreq(String s, int maxLetters,
      int minSize, int maxSize) {
    Map<String, Integer> counter =
      new HashMap<String, Integer>();
    int res = 0;
    for (int i = 0; i <= s.length() - minSize; i++) {
      String sub = s.substring(i, i + minSize);
      boolean[] alpha = new boolean[26];
      int cnt = 0;
      for (int ww = 0; ww < sub.length(); ww++)
        if (!alpha[sub.charAt(ww) - 'a']) {
          ++cnt;
          alpha[sub.charAt(ww) - 'a'] = true;
        }
      if (cnt <= maxLetters) {
        if (counter.get(sub) == null)
          counter.put(sub, 0);
        counter.put(sub, counter.get(sub) + 1);
        res = Math.max(res, counter.get(sub));
      }
    }
    return res;
  }
}
