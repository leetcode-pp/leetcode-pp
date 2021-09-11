class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        vector<int> res = {};
        
        int length = nums.size();
        if (length * k == 0)
            return res;
        
        for (int i = 0; i < length - k + 1; i++) {
            int max_val = INT_MIN;
            
            for (int j = i; j < i + k; j++) {
                max_val = max(max_val, nums[j]);
            }
            
            res.push_back(max_val);
        }
        
        return res;
    }
};
