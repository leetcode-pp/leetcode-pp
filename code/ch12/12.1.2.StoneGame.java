package ch12.code;

public class 12.1.2.StoneGame {
    public boolean stoneGame(int[] piles) {
        int sum = 0;
        for (int i : piles) {
            sum += i;
        }
        int[][] mem = new int[piles.length][piles.length];
        return 2 * findMax(0, piles.length - 1, piles, mem) >= sum;
    }

    private int findMax(int left, int right, int[] piles, int[][] mem) {
        if (left < 0 || left > right)
            return 0;
        if (mem[left][right] != 0)
            return mem[left][right];
        if (left == right) {
            mem[left][right] = piles[left];
            return piles[left];
        }

        int max = Math.max(
                piles[left] +
                        Math.min(findMax(left + 2, right, piles, mem),
                                findMax(left + 1, right - 1, piles, mem)),
                piles[right] +
                        Math.min(findMax(left + 1, right - 1, piles, mem),
                                findMax(left, right - 2, piles, mem)));

        mem[left][right] = max;
        return max;
    }
}