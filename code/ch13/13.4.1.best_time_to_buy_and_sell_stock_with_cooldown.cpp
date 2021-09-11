class Solution {
public:
    int maxProfit(vector<int>& prices) {
        if (prices.size() <= 1)
            return 0;
        
        int res = 0;
        int *buy  = new int[prices.size()]();
        int *sell = new int[prices.size()]();
        buy[0]  = -prices[0];
        buy[1]  = max((0 - prices[1]), buy[0]);
        sell[1] = max((buy[0] + prices[1]), sell[0]);
        
        for (int i = 2; i < prices.size(); i++) {
            buy[i]  = max((sell[i - 2] - prices[i]), buy[i - 1]);
            sell[i] = max((buy[i - 1] + prices[i]), sell[i - 1]); 
        }
        
        res = sell[prices.size() - 1];
        
        delete [] buy;
        delete [] sell;
        
        return res;
    }
};
