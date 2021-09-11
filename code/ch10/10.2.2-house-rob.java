class Solution {
    public int helper(int[] nums, int[] memo, int start) {
        if(start >= nums.length) return 0;
        if(memo[start] != -1) return memo[start];

        memo[start] = Math.max(helper(nums, memo, start+1), nums[start] + helper(nums,memo,  start+2));

        return memo[start];
    }
    public int rob(int[] nums) {
        int[] memo = new int[nums.length];

        for (int i = 0; i < nums.length; i++) memo[i] = -1;
        return helper(nums, memo, 0);
    }
}