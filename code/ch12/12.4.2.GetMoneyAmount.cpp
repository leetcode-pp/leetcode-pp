class Solution {
private:
    int cost(int low, int high, vector<vector<int>> mem) {
        if (low >= high)
            return 0;
        
        if (mem[low][high])
            return mem[low][high];
        
        int res = INT_MAX;
        for (int i = (low + high) / 2; i < high + 1; i++) {
            int tmp = i + max(cost(low, i - 1, mem), cost(i + 1, high, mem));
            res = min(res, tmp);
        }
        mem[low][high] = res;
        
        return res;
    }
public:
    int getMoneyAmount(int n) {
        if (n == 1) return 0;

        vector<vector<int>> mem(n + 1, vector<int>(n + 1, 0));
        return cost(1, n, mem);
    }
};
