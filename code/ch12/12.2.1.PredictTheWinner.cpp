class Solution {
private:
    int find_max(int left, int right, vector<int>& nums, vector<vector<int>>& mem) {
        if (left < 0 || right < 0 || left > right)
            return 0;
        
        if (mem[left][right] != 0)
            return mem[left][right];
        
        if (left == right) {
            mem[left][right] = nums[left];
            return nums[left];
        }
        
        int max_num = max(nums[left]  + min(find_max(left + 2, right, nums, mem), find_max(left + 1, right - 1, nums, mem)),
                          nums[right] + min(find_max(left + 1, right - 1, nums, mem), find_max(left, right - 2, nums, mem)));
        mem[left][right] = max_num;
        
        return max_num;
    }
public:
    bool PredictTheWinner(vector<int>& nums) {
        int sum = 0;
        for (int i = 0; i < nums.size(); i++)
            sum += nums[i];
        
        vector<vector<int>> mem;
        for (int i = 0; i < nums.size(); i++)
            mem.push_back(vector<int>(nums.size(), 0));
        
        return 2 * find_max(0, nums.size() - 1, nums, mem) >= sum;
    }
};
