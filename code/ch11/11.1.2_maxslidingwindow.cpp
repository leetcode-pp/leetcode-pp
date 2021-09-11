class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        vector<int> res;
        multiset<int> mysetting;
        for (int i = 0; i < nums.size(); i++) {
            mysetting.insert(nums[i]);
            if (i >= k - 1) {
                res.push_back(*mysetting.rbegin());
                mysetting.erase(mysetting.find(nums[i - k + 1]));
            }
        }
        return res;
    }
};
