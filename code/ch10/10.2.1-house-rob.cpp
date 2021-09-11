#include<iostream>
#include<vector>
#include<algorithm>

using namespace std;

class Solution {
public:
    int helper(vector<int>& nums, int start) {
        if(start >= nums.size()) return 0;

        return max(helper(nums, start+1), nums[start] + helper(nums, start+2));
    }
    int rob(vector<int>& nums) {
        return helper(nums, 0);
    }
};