class Solution {
public:
    int candy(vector<int>& ratings) {
        int n = ratings.size();
        vector<int> left_ans(n, 1);
        vector<int> right_ans(n, 1);
        int ans = 0;
        // 考虑左相邻孩子条件
        for (int i = 1; i < n; i++) {
            if (ratings[i] > ratings[i - 1]) {
                left_ans[i] = left_ans[i - 1] + 1;
            }
        }
        // 考虑右相邻孩子条件
        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) {
                right_ans[i] = right_ans[i + 1] + 1;
            }
        }
        // 合并两个条件结果
        for (int i = 0; i < n; i++) {
            cout << left_ans[i] << ":" << right_ans[i] << endl;
            if (left_ans[i] > right_ans[i]) {
                ans += left_ans[i];
            } else {
                ans += right_ans[i];
            }
        }
        return ans;
    }
};