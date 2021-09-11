import math


class Solution:
    def superpalindromesInRange(self, L: str, R: str) -> int:
        cnt = 0
        i = 1
        # 防止重复的数据
        seen = {}

        def validPalindrome(s: str) -> bool:
            l = 0
            r = len(s) - 1
            while l < r:
                if s[l] != s[r]:
                    return False
                l += 1
                r -= 1
            return True

        while i < 10 ** 5:
            # log10 防止精度丢失问题
            power = math.floor(math.log10(i))
            x = i
            r = 0
            while x > 0:
                r = r * 10 + (x % 10)
                x = x // 10
            # 如果i等于123
            # 那么Q就是12321
            Q = (i * 10 ** power + r % 10 ** power) ** 2

            if Q > int(R):
                return cnt
            if Q >= int(L) and validPalindrome(str(Q)):
                if Q not in seen:
                    cnt += 1
                    seen[Q] = True
            # 那么就是123321
            Q = (i * 10 ** (power + 1) + r) ** 2
            if Q >= int(L) and Q <= int(R) and validPalindrome(str(Q)):
                if Q not in seen:
                    cnt += 1
                    seen[Q] = True
            i += 1

        return cnt
