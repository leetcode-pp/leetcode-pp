#include<iostream>
#include<vector>
#include<algorithm>

using namespace std;

class Solution {
public:
    int rob(vector<int>& nums) {
        if(nums.size() <= 0) return 0;

        int prev, curr;

        for(int i = nums.size()-1; i >= 0; i--) {
            int tmp = curr;
            curr = max(curr, nums[i] + prev);
            prev = tmp;
        }
        return curr;
    }
};