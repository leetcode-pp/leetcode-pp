import java.lang.Math;

public class Solution {
  public int longestPalindromeSubseq(String s) {
    int n = s.length();
    int[] pre = new int[n];
    int[] cur = new int[n];
    for (int i = 0; i < n; i++) pre[i] = cur[i] = 0;
    for (int i = n - 1; i >= 0; i--) {
      for (int j = i; j < n; j++) {
        if (i == j) cur[j] = 1;
        else if (s.charAt(i) == s.charAt(j))
          cur[j] = pre[j - 1] + 2;
        else
          cur[j] = Math.max(pre[j], cur[j - 1]);
      }
      for (int j = 0; j < n; j++) pre[j] = cur[j];
    }
    return pre[n - 1];
  }
}
