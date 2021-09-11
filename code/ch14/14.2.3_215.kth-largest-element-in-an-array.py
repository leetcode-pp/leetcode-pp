from typing import List


class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        import heapq

        return heapq.nlargest(k, nums)[-1]
