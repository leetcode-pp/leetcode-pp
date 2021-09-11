class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m = len(word1)
        n = len(word2)
        cur = [0] * (n + 1)
        pre = None

        for i in range(1, n + 1):
            cur[i] = i
        for i in range(1, m + 1):
            pre = cur[0]
            cur[0] = i
            for j in range(1, n + 1):
                temp = cur[j]
                if word1[i - 1] == word2[j - 1]:
                    cur[j] = pre
                else:
                    cur[j] = min(cur[j], cur[j - 1], pre) + 1
                pre = temp
        return cur[n]
