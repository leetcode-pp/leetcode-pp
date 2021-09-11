package ch13.code;
public class Solution {
    public int maxProfit(int[] prices) {
        if (prices == null || prices.length < 2)
            return 0;

        int ans = 0;
        for (int i = 1; i < prices.length; i++) {
            if (prices[i] - prices[i - 1] > 0)
                ans += prices[i] - prices[i - 1];
        }
        return ans;
    }
}