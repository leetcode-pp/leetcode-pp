class Solution:
    def canJump(self, nums: List[int]) -> bool:
        # 可跳跃范围
        begin, end = 0, 0
        # 下次考虑的最远位置，终点位置
        next_end = end, target = len(nums) - 1
        while next_end < target:
            # min(end + 1, len(nums)) 防止越界
            for i in range(begin, min(end + 1, len(nums))):
                next_end = max(next_end, i + nums[i])
            # 范围不发生变化，终点不可达
            if next_end == end:
                return False
            begin, end = end + 1, next_end
        return True
