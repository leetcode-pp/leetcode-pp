public class GetMoneyAmount {

    public int cost(int low, int high) {
        if (low >= high)
            return 0;
        int res = Integer.MAX_VALUE;
        for (int i = low; i <= high; i++) {
            int tmp = i + Math.max(cost(i + 1, high), cost(low, i - 1));
            res = Math.min(tmp, res);
        }

        return res;
    }
    public int getMoneyAmount(int n) {
        return cost(1, n);
    }
}