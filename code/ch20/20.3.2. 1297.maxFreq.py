class Solution:
    def maxFreq(self, s: str, maxLetters: int, minSize: int, maxSize: int) -> int:
        counter, res = {}, 0
        for i in range(0, len(s) - minSize + 1):
            for length in range(minSize, maxSize + 1):
                if i + length > len(s):
                    break
                sub = s[i : i + length]
                if len(set(sub)) <= maxLetters:
                    counter[sub] = counter.get(sub, 0) + 1
                    res = max(res, counter[sub])
        return res
