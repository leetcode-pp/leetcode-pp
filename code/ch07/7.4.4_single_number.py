class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        counts = [0] * 32
        # 统计 nums 中每个元素的二进制中，对应位上的 1 的个数
        for num in nums:
            for j in range(32):
                counts[j] += num & 1
                num >>= 1
        res, m = 0, 3
        # 对每一位上，统计的 1 的个数取余
        for i in range(32):
            res <<= 1
            res |= counts[31 - i] % m
            
        return res if counts[31] % m == 0 else ~(res ^ 0xffffffff)

