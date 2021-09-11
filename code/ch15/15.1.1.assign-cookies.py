class Solution:
    def findContentChildren(self, g: List[int], s: List[int]) -> int:
        # 对孩子胃口以及饼干排序
        g.sort()
        s.sort()
        ans = 0
        # 饼干下标
        idx = 0
        # 遍历每个孩子
        for i in range(len(g)):
            # 遍历剩余的饼干
            while idx < len(s):
                if s[idx] >= g[i]:
                    ans += 1
                    idx += 1
                    break
                else:
                    idx += 1
        return ans
