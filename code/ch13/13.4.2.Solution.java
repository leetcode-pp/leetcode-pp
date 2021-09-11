package ch13.code;

import java.util.Arrays;

public class Solution {
    public int maxProfit(int[] prices) {
        if (prices == null || prices.length < 2)
            return 0;

        int b0 = -prices[0];
        int b1 = b0;

        int s0 = 0;
        int s1 = 0;
        int s2 = 0;
        for (int i = 0; i < prices.length; i++) {
            b0 = Math.max(b1, s2 - prices[i]);
            s0 = Math.max(s1, b0 + prices[i]);

            s2 = s1;
            s1 = s0;
            b1 = b0;
        }
        return s0;
    }
}