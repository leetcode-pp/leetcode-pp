import java.util.*;
import java.lang.Math;

public class Solution {
  public int largestRectangleArea(int[] heights) {
    int n = heights.length, ans = 0;
    if (n != 0) ans = heights[0];
    for (int i = 0; i < n; i++) {
      int height = heights[i];
      for (int j = i; j < n; j++) {
        height = Math.min(height, heights[j]);
        ans = Math.max(ans, (j - i + 1) * height);
      }
    }
    return ans;
  }
};
