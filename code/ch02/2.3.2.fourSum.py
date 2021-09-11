class Solution:
    def fourSum(self, nums: List[int], target: int):
        nums.sort()
        results = []
        self.findNsum(nums, target, 4, [], results)
        return results

    def findNsum(
        self,
        nums: List[int],
        target: int,
        N: int,
        tempList: List[int],
        results: List[List[int]],
    ) -> None:
        if len(nums) < N or N < 2:
            return

        # two-sum
        if N == 2:
            l = 0
            r = len(nums) - 1
            while l < r:
                if nums[l] + nums[r] == target:
                    results.append(tempList + [nums[l], nums[r]])
                    l += 1
                    r -= 1
                    # skip duplicated
                    while l < r and nums[l] == nums[l - 1]:
                        l += 1
                    while r > l and nums[r] == nums[r + 1]:
                        r -= 1
                elif nums[l] + nums[r] < target:
                    l += 1
                else:
                    r -= 1
        # 缩减问题规模
        else:
            for i in range(0, len(nums)):
                # skip duplicated
                if i == 0 or i > 0 and nums[i - 1] != nums[i]:
                    self.findNsum(
                        nums[i + 1 :],
                        target - nums[i],
                        N - 1,
                        tempList + [nums[i]],
                        results,
                    )
        return
