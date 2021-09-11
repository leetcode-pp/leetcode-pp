public class GetMoneyAmount {

    public int getMoneyAmount (int n){
        if (n == 1) return 0;
        int[][] mem = new int[n + 1][n + 1];
        return cost(1, n, mem);

    }

    private int cost(int low, int high, int[][] mem) {
        if (low >= high)
            return 0;
        if (mem[low][high] != 0)
            return mem[low][high];
        int minRes = Integer.MAX_VALUE;
        for (int i = (low + high) / 2; i <= high; i++) {
            int res = i + Math.max(cost(i + 1, high, mem), cost(low, i - 1, mem));
            minRes = Math.min(res, minRes);
        }
        mem[low][high] = minRes;
        return minRes;
    }
}