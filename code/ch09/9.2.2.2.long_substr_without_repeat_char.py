class Solution:
    def lengthofLongestSubstring(self, s:str)->int:
        res, left, right = 0, 0, 0
        settings = set()

        for left in range(0, len(s), 1):
            right = left
            while (right < len(s)):
                if (s[right] in settings):
                    break
                else:
                    settings.add(s[right])
                    res = max(res, right - left + 1)
                    right = right + 1

            settings.clear()

        return res
