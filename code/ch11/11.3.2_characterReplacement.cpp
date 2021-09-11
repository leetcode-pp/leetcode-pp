class Solution {
    public:
        int characterReplacement(string s, int k) {
            int res = 0;
            int maxf = 0;
            vector<int> count(26, 0);
            
            for (int i = 0; i < s.size(); i++) {
                count[s[i] - 'A'] += 1;
                maxf = max(maxf, count[s[i] - 'A']);
                
                if (res - maxf < k)
                    res += 1;
                else
                    count[s[i - res] - 'A'] -= 1;
            }

            return res;
        }
};
