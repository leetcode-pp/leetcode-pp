#include<iostream>
#include<vector>
#include<algorithm>

using namespace std;

class Solution {
public:
    int helper(vector<int>& nums, vector<int>&memo, int start) {
        if(start >= nums.size()) return 0;
        if(memo[start] != -1) return memo[start];

        memo[start] = max(helper(nums, memo, start+1), nums[start] + helper(nums, memo, start+2));

        return memo[start];
    }
    int rob(vector<int>& nums) {
        vector<int> memo(nums.size(), -1);
        return helper(nums, memo, 0);
    }
};