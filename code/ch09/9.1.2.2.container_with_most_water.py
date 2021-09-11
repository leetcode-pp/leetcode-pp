class Solution:
    def maxArea(self, height:List[int])->int:
        #init the param
        left, right, width, res = 0, len(height) - 1, len(height - 1, 0)

        for w in range(width, 0, -1):
            if height[left] < height[right]:
                res, left = max(res, height[left] * w), left + 1
            else:
                res, right = max(res, height[right] * w), right - 1

        return res
