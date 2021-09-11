from typing import List


class Solution:
    def judgePoint24(self, nums: List[int]) -> bool:
        permutations = self.permuteUnique(nums)
        for permutation in permutations:
            if self.compute(permutation):
                return True
        return False

    def compute(self, nums: List[float]) -> bool:
        if len(nums) == 1:
            return abs(nums[0] - 24) <= 0.00001
        for i in range(len(nums) - 1):
            # compute possible result from + - * /
            tmp = []
            tmp.append(nums[i] + nums[i + 1])
            tmp.append(nums[i] - nums[i + 1])
            tmp.append(nums[i] * nums[i + 1])
            if nums[i + 1] != 0:
                tmp.append(nums[i] / nums[i + 1])

            for num in tmp:
                new_list = nums[:]
                new_list[i] = num
                new_list.pop(i + 1)
                if self.compute(new_list):
                    return True
        return False

    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        permutations = []
        nums.sort()
        tmp = []
        visited = [False] * len(nums)

        self.backtracking(nums, tmp, visited, permutations)
        return permutations

    def backtracking(
        self, nums: List[int], tmp: List[float], visited: List[bool], perm: List[int],
    ) -> None:
        if len(nums) == len(tmp):
            perm.append(tmp[:])
            return
        for i in range(len(nums)):
            if visited[i]:
                continue
            if i > 0 and nums[i] == nums[i - 1] and not visited[i - 1]:
                continue
            visited[i] = True
            tmp.append(nums[i])
            self.backtracking(nums, tmp, visited, perm)
            visited[i] = False
            tmp.pop()
