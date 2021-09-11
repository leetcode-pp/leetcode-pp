import java.lang.Math;

public class Solution {
  public int minDistance(String word1, String word2) {
    int m = word1.length(), n = word2.length();
    int[] pre = new int[n + 1];
    int[] cur = new int[n + 1];
    for (int i = 0; i <= n; i++) pre[i] = cur[i] = 0;
    for (int i = 1; i <= n; i++) pre[i] = i;
    for (int i = 1; i <= m; i++) {
      cur[0] = i;
      for (int j = 1; j <= n; j++) {
        if (word1.charAt(i - 1) == word2.charAt(j - 1))
          cur[j] = pre[j - 1];
        else
          cur[j] = Math.min(Math.min(pre[j], pre[j - 1]),
              cur[j - 1]) + 1;
      }
      for (int k = 0; k <= n; k++) pre[k] = cur[k];
    }
    return pre[n];
  }
}
