#include <vector>
#include <map>
using namespace std;

class Solution {
public:
  int fourSumCount(const vector<int>& A,
      const vector<int>& B,
      const vector<int>& C,
      const vector<int>& D) {
    map<int, int> mapper;
    int res = 0;
    for (int i = 0; i < A.size(); i++)
      for (int j = 0; j < B.size(); j++) {
        if (mapper.count(A[i] + B[j]))
          mapper[A[i] + B[j]] = mapper[A[i] + B[j]] + 1;
        else
          mapper[A[i] + B[j]] = 1;
      }
    for (int i = 0; i < C.size(); i++)
      for (int j = 0; j < D.size(); j++)
        if (mapper.count(-1 * (C[i] + D[j])))
          res += mapper[-1 * (C[i] + D[j])];
    return res;
  }
};
