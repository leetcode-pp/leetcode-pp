class Solution {

    public int rob(int[] nums) {
        if(nums.length <= 0) return 0;

        int[] memo = new int[nums.length+1];
        memo[nums.length-1] = nums[nums.length-1];

        for (int i = nums.length-2; i >= 0; i--) {
            memo[i] = Math.max(memo[i+1], memo[i+2]+nums[i]);
        }
        return memo[0];
    }
}