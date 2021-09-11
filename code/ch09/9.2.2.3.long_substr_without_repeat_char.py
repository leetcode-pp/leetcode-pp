class Solution:
    def lengthOflongestSubstring(self, s:str)->int:
        res, left, right = 0, 0, 0
        settings = set()

        while right < len(s):
            if s[right] in settings:
                while left < right:
                    if s[left] == s[right]:
                        settings.discar(s[left])
                        left = left + 1
                        break
                    else:
                        settings.discard(s[left])
                        left = left + 1

            settings.add(s[right])
            res = max(res, right - left + 1)
            right = right + 1

        return res
