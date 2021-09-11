package ch13.code;

import java.util.Arrays;

public class Solution {
    public int maxProfit(int k, int[] prices) {
        if (prices == null || prices.length < 2)
            return 0;

        if (k > prices.length / 2 + 1) {
            int ans = 0;
            for (int i = 1; i < prices.length; i++) {
                if (prices[i] - prices[i - 1] > 0)
                    ans += prices[i] - prices[i - 1];
            }
            return ans;
        }

        int[] minPrice = new int[k + 1];
        Arrays.fill(minPrice, prices[0]);

        int[] dp = new int[k + 1];

        for (int i = 1; i < prices.length; i++) {
            for (int j = 1; j <= k; j++) {
                minPrice[j] = Math.min(minPrice[j], prices[i] - dp[j - 1]);
                dp[j] = Math.max(dp[j], prices[i] - minPrice[j]);
            }
        }
        return dp[k];
    }
}