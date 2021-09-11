class Solution:
    def canWinNim(self, n: int) -> bool:
        if n < 4:
            return True
        a, b, c = True, True, True
        for i in range(4, n + 1):
            current = not (a and b and c)
            a, b, c = b, c, current
        return c
