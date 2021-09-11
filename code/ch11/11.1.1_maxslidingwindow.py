class Solution:
    def maxSlidingWindow(self, nums:List[int], k:int)->List[int]:
        length = len(nums)
        if length * k == 0:
            return []
            
        output = []
        # 遍历所有可能的窗口
        for i in range(length - k + 1):
            max_val = -sys.maxsize - 1
            # 找到一个窗口中的最大值
            for j in range(i, i + k):
                max_val = max(max_val, nums[j])
                
            # 将最大值放到数组列表里
            output.append(max_val)
            
        return output
