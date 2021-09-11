class Solution {

    public int rob(int[] nums) {
        if(nums.length <= 0) return 0;

        int prev = 0, curr = 0;

        for (int i = nums.length-1; i >= 0; i--) {
            int tmp = curr;
            curr = Math.max(curr, nums[i] + prev);
            prev = tmp;
        }
        return curr;
    }
}