class Solution {
    public int helper(int[] nums, int start) {
        if(start >= nums.length) return 0;

        return Math.max(helper(nums, start+1), nums[start] + helper(nums, start+2));
    }
    public int rob(int[] nums) {
        return helper(nums, 0);
    }
}