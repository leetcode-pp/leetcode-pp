class Solution {
private:
    int cost(int low, int high) {
        if (low >= high) return 0;
        
        int res = INT_MAX;
        for (int i = low; i < high + 1; i++) {
            int tmp = i + max(cost(low, i - 1), cost(i + 1, high));
            res = min(res, tmp);
        }
        
        return res;
    }
public:
    int getMoneyAmount(int n) {
        return cost(1, n);
    }
};
