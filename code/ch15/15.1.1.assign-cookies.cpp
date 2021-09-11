class Solution {
public:
    int findContentChildren(vector<int>& g, vector<int>& s) {
        // 对孩子胃口以及饼干排序
        sort(g.begin(), g.end());
        sort(s.begin(), s.end());
        int ans = 0;
        // 饼干下标
        int idx = 0;
        // 遍历每个孩子
        for (int i = 0; i < g.size(); i++) {
            // 遍历剩余的饼干
            while (idx < s.size()) {
                if (s[idx] >= g[i]) {
                    ans += 1;
                    idx += 1;
                    break;
                } else {
                    idx += 1;
                }
            }
        }
        return ans;
    }
};