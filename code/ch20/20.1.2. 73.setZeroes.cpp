#include <vector>
using namespace std;

class Solution {
public:
  void setRowZeros(vector<vector<int> >& matrix, int i) {
    for (int j = 0; j < matrix[i].size(); j++)
      matrix[i][j] = 0;
  }
  void setColZeros(vector<vector<int> >& matrix, int j) {
    for (int i = 0; i < matrix.size(); i++)
      matrix[i][j] = 0;
  }
  void setZeroes(vector<vector<int> >& matrix) {
    bool isCol = false;
    int R = matrix.size(), C = matrix[0].size();
    for (int i = 0; i < R; i++) {
      if (matrix[i][0] == 0) isCol = true;
      for (int j = 1; j < C; j++)
        if (matrix[i][j] == 0) {
          matrix[i][0] = 0;
          matrix[0][j] = 0;
        }
    }
    for (int j = 1; j < C; j++)
      if (matrix[0][j] == 0)
        setColZeros(matrix, j);
    for (int i = 0; i < R; i++)
      if (matrix[i][0] == 0)
        setRowZeros(matrix, i);
    if (isCol) setColZeros(matrix, 0);
  }
};
