class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        n = len(nums)
        l, h = 0, n - 1
        while l <= h:
            mid = l + (h - l) // 2
            if mid + 1 < n and nums[mid] < nums[mid + 1]:
                l = mid + 1
            elif mid - 1 >= 0 and nums[mid] < nums[mid - 1]:
                h = mid - 1
            else:
                return mid
        return -1
