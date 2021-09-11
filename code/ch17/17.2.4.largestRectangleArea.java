import java.util.*;
import java.lang.Math;

public class Solution {
  public int largestRectangleArea(List<Integer> heights) {
    int n = heights.size(), ans = 0;
    List<Integer> st = new ArrayList<>();
    heights.add(0);
    for (int i = heights.size(); i > 0; i--) {
      int tmp = heights.get(i);
      heights.set(i, heights.get(i - 1));
      heights.set(i - 1, tmp);
    }
    heights.add(0);
    for (int i = 0; i < n + 2; i ++) {
      while (st.size() != 0 &&
           heights.get(st.get(st.size() - 1)) > heights.get(i)) {
        int buf = st.get(st.size() - 1);
        st.remove(st.size() - 1);
        ans = Math.max(ans, heights.get(buf) * (i
              - st.get(st.size() - 1) - 1));
      }
      st.add(i);
    }
    return ans;
  }
}
