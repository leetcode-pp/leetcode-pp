class Solution {
public:
    int lengthOfLongestSubstring(string s) {
            int res = 0, left = 0, right = 0;
            unordered_set<char> setting;

            for (left = 0; left < s.size(); left++) {
                right = left;
                while (right < s.size()) {
                    if (setting.find(s[right]) != setting.end()) { //has the char
                        break;
                    } else { // donnot has the char
                        setting.insert(s[right]);
                        res = max(res, right - left + 1);
                        right++;
                    }
                }
                setting.clear();
            }

            return res;
    }
};
