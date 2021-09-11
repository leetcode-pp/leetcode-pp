from collections import defaultdict


class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        queue = [beginWord]
        visited = set()
        steps = 1
        n = len(wordList)
        L = len(beginWord)
        wizards = defaultdict(list)
        for i in range(n):
            word = wordList[i]
            for j in range(L):
                wizards[word[:j] + "*" + word[j + 1 :]].append(word)

        while len(queue) > 0:
            for _ in range(len(queue)):
                cur = queue.pop(0)
                if cur in visited:
                    continue
                visited.add(cur)
                if cur == endWord:
                    return steps
                for i in range(L):
                    for word in wizards.get(cur[:i] + "*" + cur[i + 1 :], []):
                        queue.append(word)

            steps += 1
        return 0
