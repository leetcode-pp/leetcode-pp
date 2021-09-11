class Solution {
    public:
        int climbStairs(int n) {
            if (n < 2) return n;
            
            int first  = 1;
            int second = 2;

            for (int i = 3; i < n + 1; i++) {
                second = first + second;
                first  = second - first;
            }

            return second;
        }
};
