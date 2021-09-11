class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        for (int left = 0, right = numbers.size() - 1; left < right; ){
            if (numbers[left] + numbers[right] == target)
                return vector<int>{left + 1, right + 1};
            else if (numbers[left] + numbers[right] < target)
                left++;
            else
                right--;
        }
        return vector<int>{};
    }
};
