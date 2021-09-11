class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        return self.helper(nums, 0, len(nums) - 1)

    def helper(self, nums: List[int], l: int, r: int) -> int:
        if l > r:
            return float("-inf")
        mid = (l + r) // 2
        left = self.helper(nums, l, mid - 1)
        right = self.helper(nums, mid + 1, r)
        left_suffix_max_sum = right_prefix_max_sum = 0
        total = 0
        for i in reversed(range(l, mid)):
            total += nums[i]
            left_suffix_max_sum = max(left_suffix_max_sum, total)
        total = 0
        for i in range(mid + 1, r + 1):
            total += nums[i]
            right_prefix_max_sum = max(right_prefix_max_sum, total)
        cross_max_sum = left_suffix_max_sum + right_prefix_max_sum + nums[mid]
        return max(cross_max_sum, left, right)
