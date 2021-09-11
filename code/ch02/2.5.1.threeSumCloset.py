class Solution:
    def threeSumClosest(self, nums: List[int], target: int) -> int:
        n = len(nums)
        if n < 3:
            return
        nums.sort()
        res = nums[0] + nums[1] + nums[2]
        for i in range(n - 2):
            # 去重
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            # 固定 i，寻找 l 和 r，使用双指针法
            l = i + 1
            r = n - 1
            while l < r:
                s = nums[i] + nums[l] + nums[r]
                if s == target:
                    return s

                if abs(s - target) < abs(res - target):
                    res = s

                if s < target:
                    l += 1
                elif s > target:
                    r -= 1

        return res
