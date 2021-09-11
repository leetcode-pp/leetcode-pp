class Solution {
    public boolean canJump(int[] nums) {
        int begin = 0, end = 0;
        while (true) {
            // 下次考虑的最远位置
            int next_end = end;
            // min(end + 1, len(nums)) 防止越界
            for (int i = begin; i < Math.min(end + 1, nums.length); i++) {
                next_end = Math.max(next_end, i + nums[i]);
            }
            if (next_end == end) {
                break;
            }
            begin = end + 1;
            end = next_end;
        }
        return end >= nums.length - 1;
    }
}