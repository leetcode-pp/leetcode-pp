class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        ans = []
        n = len(candidates)
        visited = set()
        candidates.sort()

        def dfs(idx: int, cur: int, path: List[int]):
            if cur == 0:
                ans.append(path[:])
                return
            elif idx == n:
                return
            # 当前数字与前面数字相同并且前面数字没有在路径中，则忽略这个数字
            if (
                idx != 0
                and candidates[idx] == candidates[idx - 1]
                and (idx - 1) not in visited
            ):
                dfs(idx + 1, cur, path)
                return
            # 1.加入这个数字
            if candidates[idx] <= cur:
                path.append(candidates[idx])
                visited.add(idx)
                # 向下递归时考虑下一个数字
                dfs(idx + 1, cur - candidates[idx], path)
                # 消除影响
                path.pop()
                visited.remove(idx)
            # 2.不加入这个数字
            dfs(idx + 1, cur, path)

        dfs(0, target, [])
        return ans
