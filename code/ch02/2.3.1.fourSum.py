class Solution:
    def backtrack(
        self,
        res: List[List[int]],
        nums: List[int],
        n: int,
        tempList: List[int],
        remain: int,
        start: int,
        hashmap: dict,
    ) -> None:
        if len(tempList) > 4:
            return
        if remain == 0 and len(tempList) == 4:
            if str(tempList) in hashmap:
                return
            else:
                hashmap[str(tempList)] = True
                res.append(tempList.copy())
                return
        for i in range(start, n):
            tempList.append(nums[i])
            self.backtrack(res, nums, n, tempList, remain - nums[i], i + 1, hashmap)
            tempList.pop()

    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        res = []
        hashmap = {}
        nums.sort()
        self.backtrack(res, nums, len(nums), [], target, 0, hashmap)
        return res
