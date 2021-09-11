class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        n = len(nums)
        mapper = {}
        for i in range(n):
            if target - nums[i] in mapper:
                # 实际上这里返回的索引顺序是不重要的
                # 即返回 [i, mapper[target - nums[i]]] 也是正确的
                return [mapper[target - nums[i]], i]
            else:
                mapper[nums[i]] = i

        return []
