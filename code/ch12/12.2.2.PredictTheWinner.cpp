class Solution {
public:
    bool PredictTheWinner(vector<int>& nums) {
        int len = nums.size();
        
        vector<vector<int>> dp;
        for (int i = 0; i < nums.size(); i++)
            dp.push_back(vector<int>(nums.size(), 0));
        
        for (int i = 0;i < nums.size(); i++)
            dp[i][i] = nums[i];
        
        for (int i = len - 1; i > -1; i--)
            for (int j = i + 1; j < len; j++)
                dp[i][j] = max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1]);
        
        return dp[0][len - 1] >= 0;
    }
};
