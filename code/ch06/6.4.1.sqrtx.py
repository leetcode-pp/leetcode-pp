class Solution:
    def mySqrt(self, x: int) -> int:
        l, h = 0, x
        while l <= h:
            mid = l + (h - l) // 2
            if l == h or l + 1 == h:
                break
            elif mid * mid > x:
                h = mid - 1
            else:
                l = mid
        if h * h <= x:
            return h
        else:
            return l
