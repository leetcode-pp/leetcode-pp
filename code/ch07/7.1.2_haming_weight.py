class Solution:
    def hammingWeight(self, n:int)->int:
        retval = 0
        while n:
            retval = retval + 1
            n &= (n - 1)
            
        return retval
