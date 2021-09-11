class Solution {
    public int rob(int[] nums) {
        if(nums.length == 1) return nums[0];

        int prev = 0, curr = 0;

        for(int i = 0; i < nums.length - 1; i++) {
            int tmp = curr;
            curr = Math.max(curr, nums[i] + prev);
            prev = tmp;
        }

        int res = curr;

        prev = 0;
        curr = 0;

        for(int i = 1; i < nums.length; i++) {
            int tmp = curr;
            curr = Math.max(curr, nums[i] + prev);
            prev = tmp;
        }

        return Math.max(res, curr);
    }
}