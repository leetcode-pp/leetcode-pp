class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        n = len(nums)
        mapper = {}
        for i in range(n):
            if target - nums[i] in mapper:
                return [mapper[target - nums[i]], i]
            else:
                mapper[nums[i]] = i

        return []
