class Solution {
public:
    int maxProfit(vector<int>& prices) {
        if (prices.size() <= 1)
            return 0;
        
        int b0 = -prices[0];
        int b1 = b0;
        int s0 = 0, s1 = 0, s2 = 0;
        
        for (int i = 0; i < prices.size(); i++) {
            b0 = max(b1, s2 - prices[i]);
            s0 = max(s1, b0 + prices[i]);
            s2 = s1;
            s1 = s0;
            b1 = b0;
        }
        
        return s0;
    }
};
