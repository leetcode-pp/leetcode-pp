class Solution:
    def minEatingSpeed(self, piles: List[int], H: int) -> int:
        # 判断速度 k 是否满足条件
        def help(k: int) -> boolean:
            cnt = 0
            for pile in piles:
                cnt += (pile - 1) // k + 1
            return cnt <= H

        l, h = 1, max(piles)
        while l <= h:
            mid = l + (h - l) // 2
            if l == h:
                return l
            if help(mid):
                h = mid
            else:
                l = mid + 1
        return -1
