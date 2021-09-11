class Solution:
    def findMin(self, nums: List[int]) -> int:
        l, h = 0, len(nums) - 1
        while l <= h:
            mid = l + (h - l) // 2
            if l == h:
                return nums[l]
            elif nums[mid] > nums[h]:
                l = mid + 1
            elif nums[mid] < nums[h]:
                h = mid
        return -1
