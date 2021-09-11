class Solution:
    def hammingWeight(self, n:int)->int:
        retval = 0
        for i in range(32):
            if n & (1 << i):
                retval = retval + 1
                
        return retval
