class Solution {
    public:
        int characterReplacement(string s, int k) {
            int res = 0, left = 0, right = 0, size = s.size(), localMaxFreq = 0;

            vector<int> count(26, 0);
            for (; right < size; right++) {
                count[s[right] - 'A'] += 1;
                localMaxFreq = max(localMaxFreq, count[s[right] - 'A']);

                if ((right - left + 1) - localMaxFreq > k) {
                    res = max(res, (right - left));
                    count[s[left] - 'A'] -= 1;
                    left += 1;
                    localMaxFreq = *(max_element(count.begin(), count.end()));
                }
            }

            return max(res, right - left);
        }
};
