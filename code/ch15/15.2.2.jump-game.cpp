class Solution {
public:
    bool canJump(vector<int>& nums) {
        int n = nums.size();
        int dp[n];
        memset(dp, 0, sizeof(dp));
        dp[0] = nums[0];
        for (int i = 1; i < n; i++) {
            if (dp[i - 1] < i) {
                dp[i] = dp[i - 1];
            } else {
                if (dp[i - 1] > i + nums[i]) {
                    dp[i] = dp[i - 1];
                } else {
                    dp[i] = i + nums[i];
                }
            }
        }
        return dp[n - 1] >= n - 1;
    }
};