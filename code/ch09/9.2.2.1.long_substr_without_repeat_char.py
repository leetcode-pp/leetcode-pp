class Solution:
    def allUnique(self, s:str)->bool:
        dic = {}
        for i in range(0, len(s), 1):
            if s[i] in dic:
                return False
            else:
                dic[s[i]] = 1

        return True

    def lengthOfLongestSubstring(self, s:str)->int:
        res = 0

        for i in range(0, len(s), 1):
            for j in range(0, len(s), 1):
                if self.allUnique(s[i : j + 1]):
                    res = max(res, j - i + 1)
                else:
                    break

        return res
