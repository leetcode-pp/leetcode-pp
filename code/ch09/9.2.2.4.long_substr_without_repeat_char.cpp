class Solution {
public:
    int lengthOfLongestSubstring(string s) {
            int res = 0, left = 0, right = 0;
            int charset[256] = {-1};

            while (right < s.size() && left + res < s.size()) {
                left = max(left, charset[s[right]]);
                res  = max(res, right - left + 1);
                charset[s[right]] = right + 1;
                right++;
            }

            return res;
        }
};
