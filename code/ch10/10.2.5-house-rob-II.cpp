#include<iostream>
#include<vector>
#include<algorithm>

using namespace std;

class Solution {
public:
    int rob(vector<int>& nums) {
        if(nums.size() == 1) return nums[0];

        int prev = 0, curr = 0;

        for(int i = 0; i < nums.size()-1; i++) {
            int tmp = curr;
            curr = max(curr, nums[i] + prev);
            prev = tmp;
        } 
        int res = curr;

        prev = 0;
        curr = 0;

        for(int i = 1; i < nums.size(); i++) {
            int tmp = curr;
            curr = max(curr, nums[i] + prev);
            prev = tmp;
        }

        return max(res, curr);
    }
};