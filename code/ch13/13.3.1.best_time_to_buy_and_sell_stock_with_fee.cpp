class Solution {
public:
    int maxProfit(vector<int>& prices, int fee) {
        if (prices.size() <= 1)
            return 0;
        
	int res = 0;
        int *buy  = new int[prices.size() + 1]();
        int *sell = new int[prices.size() + 1]();
        
        buy[0] = -prices[0];
        
        for (int i = 1; i < prices.size(); i++) {
            buy[i]  = max(buy[i - 1], sell[i - 1] - prices[i]);
            sell[i] = max(buy[i - 1] + prices[i] - fee, sell[i - 1]);
        }

	res = sell[prices.size() - 1];
	delete [] buy;
	delete [] sell;
        
        return res;
    }
};
