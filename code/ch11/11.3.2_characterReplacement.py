class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        max_char_n = res = 0
        count = collections.Counter()
        for i in range(len(s)):
            count[s[i]] += 1
            max_char_n = max(max_char_n, count[s[i]])

            if res - max_char_n < k:
                res += 1
            else:
                count[s[i - res]] -= 1

        return res
