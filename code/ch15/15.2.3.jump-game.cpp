class Solution {
public:
    bool canJump(vector<int>& nums) {
        int begin = 0, end = 0;
        while (true) {
            // 下次考虑的最远位置
            int next_end = end;
            // min(end + 1, len(nums)) 防止越界
            int limit = end + 1;
            if (nums.size() < limit) {
                limit = nums.size();
            }
            for (int i = begin; i < limit; i++) {
                if (next_end > i + nums[i]) {
                    next_end = next_end;
                } else {
                    next_end = i + nums[i];
                }
            }
            if (next_end == end) {
                break;
            }
            begin = end + 1;
            end = next_end;
        }
        return end >= nums.size() - 1;
    }
};