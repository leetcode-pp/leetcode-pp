import java.util.*;
import java.lang.Math;

public class Solution {
  public class Pair {
    public final int first;
    public final int second;
    public Pair(int x, int y) {
      this.first = x;
      this.second = y;
    }
  }
  public Pair make_pair(int x, int y) {
    Pair node = new Pair(x, y);
    return node;
  }
  public int helper(String word1, int s1, int e1,
      String word2, int s2, int e2,
      Map<Pair, Integer> memo) {
    if (s1 > e1) return e2 - s2 + 1;
    else if (s2 > e2) return e1 - s1 + 1;
    char c1 = word1.charAt(s1), c2 = word2.charAt(s2);
    Pair key = make_pair(s1, s2);
    if (memo.get(key) != null) return memo.get(key);
    if (c1 == c2) {
      int buf_val = helper(word1, s1 + 1, e1, word2,
          s2 + 1, e2, memo);
      memo.put(key, buf_val);
      return buf_val;
    } else {
      int buf_val = Math.min(Math.min(helper(word1,
              s1 + 1, e1, word2, s2, e2, memo),
            helper(word1, s1, e1, word2, s2 + 1, e2,
              memo)), helper(word1, s1 + 1, e1, word2,
              s2 + 1, e2, memo)) + 1;
      memo.put(key, buf_val);
      return buf_val;
    }
  }
  public int minDistance(String word1, String word2) {
    Map<Pair, Integer> dict = new HashMap<Pair, Integer>();
    return helper(word1, 0, word1.length() - 1,
        word2, 0, word2.length() - 1, dict);
  }
}
