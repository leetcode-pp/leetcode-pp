class Solution {
    public:
        bool checkInclusion(string s1, string s2) {
            vector<int> cnts(256, 0);
            for (char ch: s1)
                cnts[ch]++;

            int left = s1.size();
            for (int i = 0, j = 0; j < s2.size(); j++) {
                if (cnts[s2[j]]-- > 0)
                    left--;

                while (left == 0) {
                    if (j + 1 - i == s1.size())
                        return true;
                    if (++cnts[s2[i++]] > 0)
                        left++;
                }
            }

            return false;
        }
};
