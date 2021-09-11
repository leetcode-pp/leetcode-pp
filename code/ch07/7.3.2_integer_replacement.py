class Solution:
    def integerReplacement(self, n:int)->int:
        count = 0
        while n > 1:
            if n & 1 == 0:
                n >>= 1
            elif (n + 1) % 4 == 0 and n != 3:
                n += 1
            else:
                n -= 1
            count += 1

        return count
