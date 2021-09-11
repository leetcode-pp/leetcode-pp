class Solution {
public:
    int lengthOfLongestSubstring(string s) {
            int res = 0, left = 0, right = 0;
            unordered_set<char> setting;

            while (right < s.size()) {
                if (setting.find(s[right]) != setting.end()) {
                    while(left < right) {
                        if (s[left] == s[right]) {
                            setting.erase(s[left]);
                            left++;
                            break;
                        } else {
                            setting.erase(s[left]);
                            left++;
                        }
                    }
                }
                setting.insert(s[right]);
                res = max(res, right - left + 1);
                right++;
            }
            return res;
    }
};
