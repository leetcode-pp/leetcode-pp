//This solution maybe Runtime Error
class Solution {
public:
    int maxProfit(int k, vector<int>& prices) {
        if (prices.size() <= 1) return 0;
        
        vector<vector<int>> dp(k + 1, vector<int>(prices.size() + 1, 0));

        for (int i = 1; i < k + 1; i++) {
            int min_price = prices[0];
            for (int j = 1; j < prices.size(); j++) {
                min_price = min(min_price, prices[j] - dp[i - 1][j - 1]);
                dp[i][j]  = max(dp[i][j - 1], prices[j] - min_price);
            }
        }
        
        return dp[k][prices.size() - 1];
    }
};
