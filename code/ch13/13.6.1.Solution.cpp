int maxProfit(int k, vector<int>& prices) {
    if (prices.size() <= 1)
        return 0;

    int *dp = new int[prices.size() + 1]();
    min_prices = prices[0];

    for (int i = 1; i < prices.size(); i++) {
        min_price = min(min_price, prices[i] - dp[i - 1]);
        dp[i + 1] = max(dp[i], prices[i] - min_price);
    }

    int res = dp[prices.size() - 1];

    delete [] dp;

    return res;
}
