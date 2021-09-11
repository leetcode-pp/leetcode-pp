class Solution:
    def largestDivisibleSubset(self, nums: List[int]) -> List[int]:
        # base case for simplicity
        S = {-1: set()}
        nums.sort()
        for x in nums:
            temp = []
            for d in S:
                if x % d == 0:
                    S[d].add(x)
                    temp.append(S[d])
                    S[d].remove(x)
            S[x] = max(temp, key=len) | {x}
        return list(max(S.values(), key=len))
