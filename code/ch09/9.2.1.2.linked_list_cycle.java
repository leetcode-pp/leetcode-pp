/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null)
            return false;

        ListNode fast = head, slow = head;
        while (fast.next != null) {
            fast = fast.next;
            if (fast == slow)
                return true;
            else {
                if (fast.next == null)
                    return false;
                fast = fast.next;
                slow = slow.next;
            }
        }
        return false;
    }
}