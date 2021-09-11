package ch13.code;

public class Solution {
    public int maxProfit(int[] prices) {
        if (prices == null || prices.length < 2)
            return 0;
        int[] dp = new int[prices.length + 1];
        int min = prices[0];

        for (int i = 1; i < prices.length; i++) {
            min = Math.min(min, prices[i] - dp[i - 1]);
            dp[i + 1] = Math.max(dp[i], prices[i] - min);
        }
        return dp[dp.length - 1];
    }
}