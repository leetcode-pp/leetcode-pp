class Solution {
public:
    int hammingWeight(uint32_t n) {
        int ret = 0;
        
        while (n) {
            ret = ret + 1;
            n &= (n - 1);
        }
        return ret;
    }
};
