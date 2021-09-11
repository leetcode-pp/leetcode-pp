class Solution:
    def candy(self, ratings: List[int]) -> int:
        left_ans, right_ans = [1] * len(ratings), [1] * len(ratings)
        ans = 0
        # 考虑左相邻孩子条件
        for i in range(1, len(ratings)):
            if ratings[i] > ratings[i - 1]:
                left_ans[i] = left_ans[i - 1] + 1
        # 考虑右相邻孩子条件
        for i in range(len(ratings) - 2, -1, -1):
            if ratings[i] > ratings[i + 1]:
                right_ans[i] = right_ans[i + 1] + 1
        # 合并两个条件结果
        for i in range(0, len(ratings)):
            ans += max(left_ans[i], right_ans[i])
        return ans
