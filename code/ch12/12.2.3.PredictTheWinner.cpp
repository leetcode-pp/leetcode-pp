class Solution {
public:
    bool PredictTheWinner(vector<int>& nums) {
        int len = nums.size();
        
        if (len % 2 == 0 || len == 1) return true;
        
        vector<int> dp(len, 0);
        
        for (int i = len - 1; i > -1; i--) {
            dp[i] = nums[i];
            for (int j = i + 1; j < len; j++) {
                dp[j] = max(nums[i] - dp[j], nums[j] - dp[j - 1]);
            }
        }
        
        return dp[len - 1] >= 0; 
    }
};
