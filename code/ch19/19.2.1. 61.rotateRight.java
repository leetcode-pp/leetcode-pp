public class Solution {
  public ListNode rotateRight(ListNode head, int k) {
    if (head == null || head.next == null) return head;
    ListNode p1 = head, res = null;
    int n = 1;
    while (p1 != null && p1.next != null) {
      p1 = p1.next;
      n += 1;
    }
    int cur = 1;
    ListNode p2 = head;
    while (cur < n - k % n) {
      p2 = p2.next;
      cur += 1;
    }
    p1.next = head;
    res = p2.next;
    p2.next = null;
    return res;
  }
}
