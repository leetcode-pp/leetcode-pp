class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        if (k == 1)
            return nums;
        int turn = nums.length - k + 1;
        int[] res = new int[turn];
        for (int i = 0; i < turn; i++) {
            res[i] = getMax(nums, i, k);
        }
        return res;
    }

    private int getMax(int[] nums, int left, int k) {
        int max = nums[left];
        for (int i = 0; i < k-1; i++) {
            left++;
            max = Math.max(max, nums[left]);
        }
        return max;
    }
}