class Solution {
public:
    int singleNumber(vector<int>& nums) {
        vector<int> t(32);
        
        for (int i = 0; i < nums.size(); i++) {
            int num = nums[i];
            for (int j = 31; j >= 0; j--) {
                t[j] += num & 1;
                num >>= 1;
                if (!num) break;
            }
        }
        
        int res = 0;
        for (int j = 31; j >= 0; j--) {
            int num = t[j] % 3;
            if (num) res += 1 << (31 - j);
        }
        
        return res;
    }
};
