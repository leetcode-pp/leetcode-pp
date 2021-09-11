class Solution:
    def isPalindrome(self, head: ListNode) -> bool:
        pre = None
        slow = fast = head

        # 一边反转前半部分，一边找中点
        while fast and fast.next:
            # 先更新fast指针
            fast = fast.next.next
            # 再反转和更新slow指针
            next = slow.next
            slow.next = pre
            pre = slow
            slow = next
        # 处理奇数个节点的情况
        if fast:
            slow = slow.next
        # 从中点开始分别向前和后遍历，逐个比较是否相同即可
        while slow:
            if slow.val != pre.val:
                return False
            pre = pre.next
            slow = slow.next
        return True
