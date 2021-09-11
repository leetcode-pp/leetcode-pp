class Solution:
    def validPalindrome(self, s: str) -> bool:
        n = len(s)

        def isPalindrome(s: str, i: int, n: int) -> bool:
            l = 0
            r = n - 1
            while l < r:
                if l == i:
                    l += 1
                elif r == i:
                    r -= 1
                if s[l] != s[r]:
                    return False
                l += 1
                r -= 1

            return True

        l = 0
        r = n - 1

        while l < r:
            if s[l] != s[r]:
                return isPalindrome(s, l, n) or isPalindrome(s, r, n)
            l += 1
            r -= 1
        return True
