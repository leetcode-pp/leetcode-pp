public class Solution {
  public ListNode reverseList(ListNode head) {
    if (!head) return null;
    ListNode prev = null, cur = head;
    while (cur) {
      cur.next = prev;
      prev = cur;
      cur = cur.next;
    }
    return prev;
  }
}
