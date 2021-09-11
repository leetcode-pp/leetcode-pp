class Solution {
public:
    int maxProfit(vector<int>& prices) {
        if (prices.size() == 0)
            return 0;

        int max_diff = 0;
        int min_price = prices[0];
        
        for (int i = 1; i < prices.size(); i++) {
            if (min_price > prices[i])
                min_price = prices[i];
            max_diff = max(max_diff, prices[i] - min_price);
        }
        
        return max_diff;
    }
};
