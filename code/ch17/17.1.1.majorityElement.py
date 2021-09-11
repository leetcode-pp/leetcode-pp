class Solution:
    def majorityElement(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = []
        cnt1 = 0
        cnt2 = 0
        n1 = None
        n2 = None

        # 筛选出现次数最多的前两个
        for num in nums:
            if num == n1:
                cnt1 += 1
            elif num == n2:
                cnt2 += 1
            elif cnt1 == 0:
                n1 = num
                cnt1 += 1
            elif cnt2 == 0:
                n2 = num
                cnt2 += 1
            else:
                cnt1 -= 1
                cnt2 -= 1
        # 筛选出现次数超过三分之一的
        # 这里的cnt1和cnt2的含义已经变了
        # 这里的cnt1和cnt2表示的是出现次数， 而上面的则不是
        cnt1 = 0
        cnt2 = 0
        for num in nums:
            if num == n1:
                cnt1 += 1
            if num == n2:
                cnt2 += 1
        if cnt1 > n // 3:
            res.append(n1)
        if cnt2 > n // 3:
            res.append(n2)
        return res
