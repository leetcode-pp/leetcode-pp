from typing import List
# Definition for singly-linked list.
class ListNode(object):
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution(object):
    def mergeKLists(self, lists: List[ListNode]) -> ListNode:
        import heapq

        l = []

        for head in lists:
            if head:
                heapq.heappush(l, (head.val, head))

        dummy = ListNode(-1)
        cur = dummy

        while l:
            _, node = heapq.heappop(l)
            cur.next = node
            cur = cur.next
            node = node.next
            if node:
                heapq.heappush(l, (node.val, node))

        return dummy.next
