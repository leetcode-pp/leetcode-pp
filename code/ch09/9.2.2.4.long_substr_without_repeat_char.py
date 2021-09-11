class Solution:
    def lengthOfLongestSubstring(self, s:str)->int:
        res, left, right = 0, 0, 0
        dic = {}

        while right < len(s) and left + res < len(s):
            if s[right] in dic:
                left = max(left, dic[s[right]] + 1)

            dic[s[right]] = right
            res = max(res, right - left + 1)
            right = right + 1

        return res
