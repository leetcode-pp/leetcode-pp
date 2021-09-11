class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m = len(word1)
        n = len(word2)
        pre = [0] * (n + 1)
        cur = [0] * (n + 1)

        for i in range(1, n + 1):
            pre[i] = i
        for i in range(1, m + 1):
            cur[0] = i
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]:
                    cur[j] = pre[j - 1]
                else:
                    cur[j] = min(pre[j], pre[j - 1], cur[j - 1]) + 1
            # move on
            pre = cur.copy()
        # 最后进行了一次交换， cur变成了pre，因此我们应该取pre[n]，而不是cur[n]
        return pre[n]
