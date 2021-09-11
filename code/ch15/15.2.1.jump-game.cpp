class Solution {
public:
    bool canJump(vector<int>& nums) {
        bool dp[nums.size()];
        memset(dp, false, sizeof(dp));
        dp[0] = true;
        for (int i = 1; i < nums.size(); i++) {
            for (int j = 0; j < i; j++) {
                if (j + nums[j] >= i) {
                    dp[i] = dp[i] | dp[j];
                }
            }
        }
        return dp[nums.size() - 1];
    }
};