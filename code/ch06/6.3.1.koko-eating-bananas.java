class Solution {
    public int minEatingSpeed(int[] piles, int H) {
        int maxPile = piles[0];
        for (int pile : piles) {
            maxPile = Math.max(pile, maxPile);
        }
        int l = 1, h = maxPile;
        while (l <= h) {
            int mid = l + (h - l) / 2;
            if (l == h) {
                return l;
            } else if (help(piles, mid, H)) {
                h = mid;
            } else {
                l = mid + 1;
            }
        }
        return -1;
    }
    // 判断速度 k 是否满足条件
    public boolean help(int[] piles, int k, int H) {
        int cnt = 0;
        for (int pile : piles) {
            cnt += (pile - 1) / k + 1;
        }
        return cnt <= H;
    }
}
