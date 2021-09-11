class Solution:
    def poorPigs(self, buckets: int, minutesToDie: int, minutesToTest: int) -> int:
        cnt = 0
        while (minutesToTest / minutesToDie + 1) ** cnt < buckets:
            cnt += 1
        return cnt
