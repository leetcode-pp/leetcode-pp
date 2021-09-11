class Solution {
public:
    int maxProfit(int k, vector<int>& prices) {
        if (prices.size() <= 1)
            return 0;
        
        if (k > (prices.size() / 2 + 1)) {
            int max_profit = 0;
            for (int i = 1; i < prices.size(); i++) {
                if (prices[i] - prices[i - 1] > 0)
                    max_profit += prices[i] - prices[i - 1];
            }
            
            return max_profit;
        }
        
        int *min_price = new int[k + 1]();
        for (int i = 0; i < k + 1; i++)
            min_price[i] = prices[0];
        
        int *dp        = new int[k + 1]();
        
        for (int i = 1; i < prices.size(); i++) {
            for (int j = 1; j < k + 1; j++) {
                min_price[j] = min(min_price[j], prices[i] - dp[j - 1]);
                dp[j] = max(dp[j], prices[i] - min_price[j]);
            }
        }
        
        int res = dp[k];
        delete [] min_price;
        delete [] dp;
        return res;
    }
};
