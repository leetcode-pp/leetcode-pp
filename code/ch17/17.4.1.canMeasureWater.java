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
    Pair buf = new Pair(x, y);
    return buf;
  }
  public boolean canMeasureWater(int x, int y, int z) {
    if (x + y < z) return false;
    Queue<Pair> q = new LinkedList<Pair>();
    q.offer(make_pair(0, 0));
    Set<Pair> seen = new HashSet<Pair>();
    seen.add(make_pair(0, 0));
    while (q.size() != 0) {
      Pair buf = q.poll();
      int a = buf.first, b = buf.second;
      if (a == z || b == z || a + b == z) return true;
      Set<Pair> states = new HashSet<Pair>();
      states.add(make_pair(x, b));
      states.add(make_pair(a, y));
      states.add(make_pair(0, b));
      states.add(make_pair(a, 0));
      int val = ((b < x - a) ? 0 : (b - (x - a)));
      states.add(make_pair(Math.min(x, b + a), val));
      val = ((a + b < y) ? 0 : (a - (y - b)));
      states.add(make_pair(val, Math.min(b + a, y)));
      Iterator<Pair> it = states.iterator();
      while (it.hasNext()) {
        Pair node = it.next();
        if (seen.contains(node)) continue;
        q.offer(node);
        seen.add(node);
      }
    }
    return false;
  }
}
