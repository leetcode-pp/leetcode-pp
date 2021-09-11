class Solution {
    public int splitArray(int[] nums, int m) {
        long maxNum = nums[0], sumNum = 0;
        for (long num : nums) {
            maxNum = Math.max(maxNum, num);
            sumNum += num;
        }
        long l = maxNum, h = sumNum;
        while (l <= h) {
            long mid = l + (h - l) / 2;
            if (l == h) {
                return (int) l;
            } else if (help(nums, mid, m)) {
                h = mid;
            } else {
                l = mid + 1;
            }
        }
        return -1;
    }

    public boolean help(int[] nums, long ans, int m) {
        long cnt = 1, cur = 0;
        for (long num : nums) {
            if (cur + num > ans) {
                cur = num;
                cnt += 1;
            } else {
                cur += num;
            }
        }
        return cnt <= m;
    }
}
