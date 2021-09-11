class Solution:
    def splitArray(self, nums: List[int], m: int) -> int:
        # 判断 ans 是否可行
        def help(ans: int) -> boolean:
            cnt, cur = 1, 0
            for num in nums:
                if (cur + num) > ans:
                    cur = num
                    cnt += 1
                else:
                    cur += num
            return cnt <= m

        l, h = max(nums), sum(nums)
        while l <= h:
            mid = l + (h - l) // 2
            if l == h:
                return l
            elif help(mid):
                h = mid
            else:
                l = mid + 1
        return -1
