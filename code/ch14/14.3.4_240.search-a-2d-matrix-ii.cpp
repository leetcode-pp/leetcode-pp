class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if(matrix.size() == 0 || matrix[0].size() == 0) return false;
        int i = matrix.size() - 1;
        int j = 0;
        while(i >= 0 && j < matrix[0].size()){
            if(matrix[i][j] > target)
                --i;
            else if(matrix[i][j] < target)
                ++j;
            else return true;
        }
        return false;
    }
};