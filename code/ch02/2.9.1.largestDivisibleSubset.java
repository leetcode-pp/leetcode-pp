import java.util.*;

public class Solution {
  public class node {
    Set<Integer> s;
    node() {
      this.s = new HashSet<Integer>();
    }
    boolean less (node rhs) {
      return this.s.size() > rhs.s.size();
    }
  }
  public List<Integer> largestDivisibleSubset(int[] nums) {
    Map<Integer, node> S = new HashMap<Integer, node>();
    S.put(-1, new node());
    Arrays.sort(nums);
    for (int i = 0; i < nums.length; i++) {
      int x = nums[i];
      List<node> temp = new ArrayList<>();
      Set<Map.Entry<Integer, node> > key_set = S.entrySet();
      Iterator<Map.Entry<Integer, node> > it = key_set.iterator();
      while (it.hasNext()) {
        Map.Entry<Integer, node> entry = it.next();
        int d = entry.getKey();
        if (x % d == 0) {
          entry.getValue().s.add(x);
          temp.add(S.get(d));
          S.get(d).s.remove(x);
        }
      }
      node buf = new node();
      for (int j = 0; j < temp.size(); j++)
        if (temp.get(j).less(buf)) {
          buf.s = new HashSet<Integer>();
          Iterator<Integer> copy_it = temp.get(j).s.iterator();
          while (copy_it.hasNext()) {
            Integer buf_val = copy_it.next();
            buf.s.add(buf_val);
          }
        }
      if (!buf.s.contains(x)) buf.s.add(x);
      S.put(x, buf);
    }
    List<Integer> ans = new ArrayList<>();
    node buf = new node();
    Set<Map.Entry<Integer, node> > key_set = S.entrySet();
    Iterator<Map.Entry<Integer, node> > it = key_set.iterator();
    while (it.hasNext()) {
      Map.Entry<Integer, node> entry = it.next();
      node mid = entry.getValue();
      if (mid.less(buf)) buf.s = mid.s;
    }
    Iterator<Integer> ano_it = buf.s.iterator();
    while (ano_it.hasNext()) {
      Integer val = ano_it.next();
      ans.add(val);
    }
    return ans;
  }
}
