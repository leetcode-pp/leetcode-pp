import java.util.*;

class KthLargest {
  public static Comparator<Integer> less = new
    Comparator<Integer>() {
      public int compare(Integer e1, Integer e2) {
        return e2 - e1;
      }
    };
  public static Comparator<Integer> greater = new
    Comparator<Integer>() {
      public int compare(Integer e1, Integer e2) {
        return e1 - e2;
      }
    };
  public Queue<Integer> qlarge;
  public Queue<Integer> qsmall;
  public int k;
  public KthLargest(int buf_k, int[] nums) {
    qlarge = new PriorityQueue<>(less);
    qsmall = new PriorityQueue<>(greater);
    k = buf_k;
    for (int i = 0; i < nums.length; i++)
      qlarge.add(nums[i]);
    while (qsmall.size() < k - 1) {
      qsmall.add(qlarge.peek());
      qlarge.poll();
    }
  }
  public int add(int val) {
    int cmp;
    if (k > 1) cmp = qsmall.peek();
    else {
      qlarge.add(val);
      return qlarge.peek();
    }
    if (cmp < val) {
      qsmall.poll();
      qsmall.add(val);
      qlarge.add(cmp);
    } else {
      qlarge.add(val);
    }
    return qlarge.peek();
  }
}
