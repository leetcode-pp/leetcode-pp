class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        vector<int> ret;
        for (int i = 0; i <= numbers.size() - 1 - 1; i++) {
            for (int j = i + 1; j <= numbers.size() - 1; j++) {
                if (numbers[i] + numbers[j] == target) {
                    ret.push_back(i + 1);
                    ret.push_back(j + 1);
                }
            }
        }
        return ret;
    }
};
