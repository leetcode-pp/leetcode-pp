class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        ans = []
        n = len(nums)
        visited = set()

        def dfs(path: List[int]):
            if len(path) == n:
                ans.append(path[:])
                return
            for i in range(n):
                if i not in visited:
                    visited.add(i)
                    path.append(nums[i])
                    dfs(path)
                    path.pop()
                    visited.remove(i)

        dfs([])
        return ans
