import java.util.*;
import java.lang.Math;

public class Solution {
  public int largetstRectangleArea(int[] heights) {
    int n = heights.length, ans = 0;
    List<Integer> l = new ArrayList<>(),
      r = new ArrayList<>();
    for (int i = 0; i < n; i++) {
      l.add(-1);
      r.add(n);
    }
    for (int i = 0; i < n; i++) {
      int j = i - 1;
      while (j >= 0 && heights[j] >= heights[i])
        j = l.get(j);
      l.set(i, j);
    }
    for (int i = n - 2; i >= 0; i--) {
      int j = i + 1;
      while (j < n && heights[j] >= heights[i])
        j = r.get(j);
      r.set(i, j);
    }
    for (int i = 0; i < n; i++)
      ans = Math.max(ans, heights[i] * (r.get(i) - l.get(i) - 1));
    return ans;
  }
}
