class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0:
            return False
        if x == 0:
            return True
        if x % 10 == 0:
            return False

        res = 0
        copy = x
        while x > 0:
            res = res * 10 + (x % 10)
            x = x // 10

        return copy == res
