class Solution {
public:
    int mySqrt(int x) {
        long l = 0, h = x;
        while (l <= h) {
            long mid = l + (h - l) / 2;
            if (l == h || l + 1 == h) {
                break;
            } else if (mid * mid > x) {
                h = mid - 1;
            } else {
                l = mid;
            }
        }
        if (h * h <= x) {
            return (int)h;
        } else {
            return (int)l;
        }
    }
};