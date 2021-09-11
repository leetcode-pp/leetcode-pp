import functools


class Solution:
    def largestNumber(self, nums: List[int]) -> str:
        s = [str(i) for i in nums]

        def comp(a, b):
            if (a + b) > (b + a):
                return 1
            if (a + b) < (b + a):
                return -1
            return 0

        # 这里加了一次 int 转换过程，用于处理第一个数字为 0 的情况
        s.sort(reverse=True, key=functools.cmp_to_key(comp))
        return str(int("".join(s)))
