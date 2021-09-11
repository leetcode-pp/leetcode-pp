class Solution:
    def hasCycle(self, head:ListNode)->bool:
        if head is None:
            return False

        node_set = {}
        while head.next:
            node_set[head] = True

            if head.next in node_set:
                return True

            head = head.next

        return False
