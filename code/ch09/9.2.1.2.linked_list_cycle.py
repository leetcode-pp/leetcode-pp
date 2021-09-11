class Solution:
    def hasCycle(self, head:ListNode)->bool:
        if head == None or head.next == None:
            return False

        pslow = pfast = head
        while pfast != None and pfast.next != None:
            pslow = pslow.next
            pfast = pfast.next.next
            if pfast == pslow:
                break

        if pfast == None or pfast.next == None:
            return False
        elif pfast == pslow:
            return True

        return False
