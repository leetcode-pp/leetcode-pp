class Solution {
private:
    int find_max(int left, int right, vector<int>& piles, vector<vector<int>>& mem) {
        if (left < 0 || right < 0 || left > right) return 0;

        if (mem[left][right] != 0)
            return mem[left][right];
        
        if (left == right) {
            mem[left][right] = piles[left];
            return piles[left];
        }

        int max_stone = max(piles[left]  + min(find_max(left + 2, right, piles, mem), find_max(left + 1, right - 1, piles, mem)),
                            piles[right] + min(find_max(left + 1, right - 1, piles, mem), find_max(left, right - 2, piles, mem)));
        mem[left][right] = max_stone;
        
        return max_stone;
    }
public:
    bool stoneGame(vector<int>& piles) {
        int sum = 0;

        for (int i = 0; i < piles.size(); i++)
            sum += piles[i];
        
        vector<vector<int>> mem;
        for (int i = 0; i < piles.size(); i++)
            mem.push_back(vector<int>(piles.size(), 0));

        return 2 * find_max(0, piles.size() - 1, piles, mem) > sum;
    }
};
