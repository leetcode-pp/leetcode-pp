from collections import defaultdict


class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        queue = [beginWord]
        visited = set()
        steps = 1
        L = len(beginWord)

        while len(queue) > 0:
            for _ in range(len(queue)):
                cur = queue.pop(0)
                if cur in visited:
                    continue
                visited.add(cur)
                if cur == endWord:
                    return steps
                # 这里我们尝试枚举所有可能的转换，并查看是否在wordList中，如果在，我们将其加入队列

                # 单词中的每一位都进行变换
                for i in range(L):
                    # cur[i] 依次变成26个小写字母中的每一个
                    for j in range(26):
                        s = list(cur)
                        s[i] = chr(ord("a") + j)
                        for word in wordList:
                            if word == "".join(s):
                                queue.append(word)
            steps += 1
        return 0
