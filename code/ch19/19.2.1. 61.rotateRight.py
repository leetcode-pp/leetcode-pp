class Solution:
    def rotateRight(self, head: ListNode, k: int) -> ListNode:
        if head == None or head.next == None:
            return head
        p1 = head
        res = None
        n = 1

        while p1 and p1.next:
            p1 = p1.next
            n += 1
        cur = 1
        p2 = head
        while cur < n - k % n:
            p2 = p2.next
            cur += 1
        p1.next = head
        res = p2.next
        p2.next = None

        return res
