class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        n = len(nums)
        max_sum_ending_curr_index = max_sum = nums[0]
        for i in range(1, n):
            max_sum_ending_curr_index = max(
                max_sum_ending_curr_index + nums[i], nums[i]
            )
            max_sum = max(max_sum_ending_curr_index, max_sum)

        return max_sum
