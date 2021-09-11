class Solution {
public:
    int maxProfit(vector<int>& prices, int fee) {
        if (prices.size() <= 1)
            return 0;
        
        int pre_buy  = -prices[0];
        int pre_sell = 0;
        
        for (int i = 1; i < prices.size(); i++) {
            int buy  = max(pre_buy, pre_sell - prices[i]);
            int sell = max(pre_buy + prices[i] - fee, pre_sell);
            pre_buy  = buy;
            pre_sell = sell;
        }
        
        return pre_sell;
    }
};
