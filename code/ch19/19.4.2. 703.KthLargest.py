import heapq


class KthLargest:
    def __init__(self, k: int, nums: List[int]):
        self.k = k
        self.nums = heapq.nlargest(k, nums + [float("-inf")])
        heapq.heapify(self.nums)

    def add(self, val: int) -> int:
        heapq.heappushpop(self.nums, val)
        return self.nums[0]
