class Solution :
    def maxArea(self, height:List[int])->int:
        res, area = 0, 0
        for i in range(0, len(height), 1):
            fo j in range(i + 1, len(height), 1):
                area = (j - i) * min(height[i], height[j])
                if area > res:
                    res = area

        return res
    
