from typing import List


class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        import heapq

        heap = []

        for i in range(k):
            heap.append(nums[i])

        heapq.heapify(heap)

        for i in range(k, len(nums)):
            if nums[i] > heap[0]:
                heapq.heappop(heap)
                heapq.heappush(heap, nums[i])

        return heap[0]
