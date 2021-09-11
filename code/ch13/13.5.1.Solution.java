package ch13.code;
public class Solution {
    public int maxProfit(int k, int[] prices) {
        if (prices == null || prices.length < 2)
            return 0;

        int[][] dp = new int[k + 1][prices.length];

        for (int i = 1; i <= k; i++) {
            int minPrice = prices[0];
            for (int j = 1; j < prices.length; j++) {
                minPrice = Math.min(minPrice, prices[j] - dp[i - 1][j - 1]);
                dp[i][j] = Math.max(dp[i][j - 1], prices[j] - minPrice);
            }
        }
        return dp[k][prices.length - 1];
    }
}