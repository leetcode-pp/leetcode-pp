from typing import List
# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def mergeKLists(self, lists: List[ListNode]) -> ListNode:
        def mergeTwoLists(l1: ListNode, l2: ListNode) -> ListNode:

            sentinel = ListNode(-1)  # 哨兵结点

            curr = sentinel
            while l1 and l2:
                if l1.val <= l2.val:
                    curr.next = l1
                    l1 = l1.next
                else:
                    curr.next = l2
                    l2 = l2.next
                curr = curr.next

            curr.next = l1 if l1 is not None else l2

            return sentinel.next

        if not lists:
            return None
        l = lists[0]

        for i in range(1, len(lists)):
            l = mergeTwoLists(l, lists[i])

        return l
