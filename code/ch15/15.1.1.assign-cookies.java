class Solution {
    public int findContentChildren(int[] g, int[] s) {
        // 对孩子胃口以及饼干排序
        Arrays.sort(g);
        Arrays.sort(s);
        int ans = 0;
        // 饼干下标
        int idx = 0;
        // 遍历每个孩子
        for (int i = 0; i < g.length; i++) {
            // 遍历剩余的饼干
            while (idx < s.length) {
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
}