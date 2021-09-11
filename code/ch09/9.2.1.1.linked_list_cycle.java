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
        Set<ListNode> set = new HashSet<>();
        ListNode node = head;
        while (node.next != null) {
            node = node.next;
            if (set.contains(node))
                return true;
            else
                set.add(node);
        }
        return false;
    }
}