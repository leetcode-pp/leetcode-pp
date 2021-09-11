import java.util.*;

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
    Pair buf = new Pair(x, y);
    return buf;
  }
  public Map<Pair, Integer> visited;
  public Solution() {
    this.visited = new HashMap<Pair, Integer>();
  }
  int uniquePaths(int m, int n) {
    if (visited.get(make_pair(m, n)) != null)
      return visited.get(make_pair(m, n));
    if (m == 1 || n == 1) return 1;
    int cnt = uniquePaths(m - 1, n) +
      uniquePaths(m, n - 1);
    visited.put(make_pair(m, n), cnt);
    return cnt;
  }
}
