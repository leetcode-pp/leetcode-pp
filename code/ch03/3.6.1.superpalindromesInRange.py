import math


class Solution:
    def superpalindromesInRange(self, L: str, R: str) -> int:
        cnt = 0

        def validPalindrome(s: str) -> bool:
            l = 0
            r = len(s) - 1
            while l < r:
                if s[l] != s[r]:
                    return False
                l += 1
                r -= 1
            return True

        for i in range(math.floor(int(L) ** 0.5), math.ceil(int(R) ** 0.5)):
            if validPalindrome(str(i)) and validPalindrome(str(i ** 2)):
                cnt += 1
        return cnt
