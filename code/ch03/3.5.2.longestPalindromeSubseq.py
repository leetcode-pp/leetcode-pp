class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        n = len(s)
        pre = [0] * n
        cur = [0] * n

        for i in reversed(range(n)):
            for j in range(i, n):
                if i == j:
                    cur[j] = 1
                elif s[i] == s[j]:
                    cur[j] = pre[j - 1] + 2
                else:
                    cur[j] = max(pre[j], cur[j - 1])
            pre = cur.copy()
        return pre[-1]
