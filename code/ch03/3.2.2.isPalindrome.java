public class Solution {
  public boolean isPalindrome(ListNode head) {
    ListNode pre = null;
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
      fast = fast.next.next;
      ListNode next = slow.next;
      slow.next = pre;
      pre = slow;
      slow = next;
    }
    if (fast != null) slow = slow.next;
    while (slow != null) {
      if (slow.val != pre.val) return false;
      pre = pre.next;
      slow = slow.next;
    }
    return true;
  }
}
