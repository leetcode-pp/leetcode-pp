class Solution {
private:
    bool compute(double a) {
        return fabs(24 - a) < 1e-8;
    }
    bool compute(double a, double b) {
        return compute(a + b) || compute(a - b) || compute(a * b) || (b && compute(a / b));
    }
    bool compute(double a, double b, double c) {
        return compute(a + b, c) || compute(a - b, c) || compute(a * b, c) || (b && compute(a / b, c)) ||
               compute(a, b + c) || compute(a, b - c) || compute(a, b * c) || (c && compute(a, b / c));
    }
    bool compute(double a, double b, double c, double d) {
        bool res = compute(a + b, c, d) || compute(a - b, c, d) || compute(a * b, c, d) || (b && compute(a / b, c, d)) ||
                   compute(a, b + c, d) || compute(a, b - c, d) || compute(a, b * c, d) || (c && compute(a, b / c, d)) ||
                   compute(a, b, c + d) || compute(a, b, c - d) || compute(a, b, c * d) || (d && compute(a, b, c / d));
        
        return res;
    }
public:
    bool judgePoint24(vector<int>& nums) {
        sort (nums.begin(), nums.end());
        
        do {
            if (compute(nums[0], nums[1], nums[2], nums[3]))
                return true;
        } while (next_permutation(nums.begin(), nums.end()));

        return false;
    }
};
