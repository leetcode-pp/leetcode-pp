#include<iostream>
#include<vector>
#include<algorithm>

using namespace std;

class Solution {
public:
    int rob(vector<int>& nums) {
        if(nums.size() <= 0) return 0;

        vector<int> memo(nums.size()+1);

        memo[nums.size()-1] = nums[nums.size()-1];

        for(int i = nums.size()-2; i >= 0; i--) {
            memo[i] = max(memo[i+1], memo[i+2] + nums[i]);
        }
        return memo[0];
    }
};