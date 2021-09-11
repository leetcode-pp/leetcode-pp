package ch13.code;
public class Solution {

    public int maxProfitOrigin(int[] prices) {
        int max = 0;
        for (int i = prices.length - 1; i > 0; i--) {
            for (int j = i - 1; j >= 0; j--) {
                if (prices[i] - prices[j] > max)
                    max = prices[i] - prices[j];
            }
        }
        return max;
    }
}