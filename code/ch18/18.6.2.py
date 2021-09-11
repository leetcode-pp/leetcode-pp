class Solution:
    def countPrimes(self, n: int) -> int:
        if n <= 1:
            return 0
        tmp = [True for i in range(n)]
        ans = 0
        tmp[0] = False
        tmp[1] = False
        for i in range(2, n):
            if not tmp[i]:
                continue
            # 查找 i 倍数的优化细节：i * i开始
            for j in range(i * i, n, i):
                tmp[j] = False
        for i in range(n):
            if tmp[i]:
                ans += 1
        return ans
