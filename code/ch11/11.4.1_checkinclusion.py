class Solution:
    #生成可能的子字符串
    def perm(self, s:str)->str:
        if len(s) <= 1:
            return [s]
        
        s1 = []
        for i in range(len(s)):
            for j in self.perm(s[0:i] + s[i + 1:]):
                s1.append(s[i] + j)
                
        return s1

    def checkInclusion(self, s1: str, s2: str) -> bool:
        if (len(s1) > len(s2)):
            return False
        
        s1_perm = list(set(self.perm(s1)))
        #检测字符串S1的排列是否是字符串S2的子串
        for i in s1_perm:
            idx = s2.find(i)
            if idx != -1:
                return True
            
        return False
