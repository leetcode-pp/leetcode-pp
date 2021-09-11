class Solution:
    def canWinNim(self, n: int) -> bool:
        mem = [True] * (n + 1)
        for i in range(4, n + 1):
            if not (mem[i - 1] and mem[i - 2] and mem[i - 3]):
                mem[i] = True
            else:
                mem[i] = False
        return mem[n]