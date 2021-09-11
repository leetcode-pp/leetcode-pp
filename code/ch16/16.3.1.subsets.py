class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        ans = []
        n = len(nums)

        def dfs(idx: int, path: List[int]):
            if idx == n:
                ans.append(path[:])
                return
            path.append(nums[idx])
            dfs(idx + 1, path)
            path.pop()
            dfs(idx + 1, path)

        dfs(0, [])
        return ans
