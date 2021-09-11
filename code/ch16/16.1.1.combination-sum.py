class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        ans = []
        n = len(candidates)

        def dfs(idx: int, cur: int, path: List[int]):
            # 递归结束
            if cur == 0:
                # 克隆 path 并添加到 ans
                ans.append(path[:])
                return
            elif idx == n:
                return
            # 1.加入这个数字
            if candidates[idx] <= cur:
                path.append(candidates[idx])
                # idx 不变，继续考虑当前数字
                dfs(idx, cur - candidates[idx], path)
                # 消除影响
                path.pop()
            # 2.不加入这个数字，考虑下一个数字
            dfs(idx + 1, cur, path)

        dfs(0, target, [])
        return ans
