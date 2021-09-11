class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        def dfs(idx: int, path: List[int]) -> None:
            # 结束条件
            # 1. 找到解
            if len(path) == n:
                ans.append(path.copy())
                return
            # 2. 搜索完毕
            if idx == n:
                return

            # 考虑可能的解，进入下一层递归
            for num in nums:
                # 非法解忽略
                if num in visited:
                    continue
                # 更新状态
                visited.add(num)
                path.append(num)
                dfs(idx + 1, path)
                # 恢复状态
                path.pop()
                visited.remove(num)

        ans = []
        visited = set()
        n = len(nums)
        dfs(0, [])
        return ans
