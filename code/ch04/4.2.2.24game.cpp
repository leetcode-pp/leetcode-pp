class Solution {
private:
    bool compute(vector<double>& nums) {
        if (nums.size() == 1)
            return fabs(nums[0] - 24.0) < 1e-8;
        
        for (int left = 0; left < nums.size() - 1; left++) {
            for (int right = left + 1; right < nums.size(); right++) {
                vector<double> tmp;
                for (int k = 0; k < nums.size(); k++)
                    if (k != left && k != right) tmp.push_back(nums[k]);
                
                tmp.push_back(nums[left] + nums[right]);
                if (compute(tmp))
                    return  true;
                
                tmp.back() = nums[left] * nums[right];
                if (compute(tmp))
                    return true;
                
                tmp.back() = nums[left] - nums[right];
                if (compute(tmp))
                    return true;
                
                tmp.back() = nums[left] / nums[right];
                if (compute(tmp))
                    return true;
                
                tmp.back() = nums[right] - nums[left];
                if (compute(tmp))
                    return true;
                
                tmp.back() = nums[right] / nums[left];
                if (compute(tmp))
                    return true;
            }
        }
        
        return false;
    }
public:
    bool judgePoint24(vector<int>& nums) {
        vector<double> tmp(nums.begin(), nums.end());
        return compute(tmp);
    }
};
