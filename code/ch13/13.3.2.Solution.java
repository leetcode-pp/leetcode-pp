package ch13.code;

public class Solution {
    public int maxProfit(int[] prices, int fee) {
        if (prices == null || prices.length < 2)
            return 0;

        int preBuy = -prices[0];
        int preSell = 0;

        for (int i = 1; i < prices.length; i++) {
            int buy = Math.max(preBuy, preSell - prices[i]);
            int sell = Math.max(preBuy + prices[i] - fee, preSell);

            preBuy = buy;
            preSell = sell;
        }
        return preSell;
    }
}