from typing import List


class Solution:
    def stoneGame(self, piles: List[int]) -> bool:
        sum = 0
        for i in piles:
            sum += i
        mem = []
        for i in range(len(piles)):
            mem.append([0] * len(piles))

        return 2 * self.find_max(0, len(piles) - 1, piles, mem) > sum

    def find_max(
        self, left: int, right: int, piles: List[int], mem: List[List[int]]
    ) -> int:
        if left < 0 or right < 0 or left > right:
            return 0
        if mem[left][right] != 0:
            return mem[left][right]
        if left == right:
            mem[left][right] = piles[left]
            return piles[left]
        max_stone = max(
            piles[left] + min(
                self.find_max(left + 2, right, piles, mem),
                self.find_max(left + 1, right - 1, piles, mem),
            ),
            piles[right] + min(
                self.find_max(left + 1, right - 1, piles, mem),
                self.find_max(left, right - 2, piles, mem),
            ),  # black formatter added trailing comma
        )
        mem[left][right] = max_stone
        return max_stone

