#include <vector>
#include <string>
using namespace std;

class Solution {
public:
  vector<int> sequentialDigits(int low, int high) {
    string numbers("123456789");
    vector<int> ins;
    int n = numbers.size();
    for (int i = 1; i < n; i++)
      for (int j = 0; j < n - i; j++)
        ins.push_back(atoi(numbers.substr(j, i + 1).c_str()));
    vector<int> ans;
    for (int i = 0; i < ins.size(); i++)
      if (ins[i] >= low && ins[i] <= high)
        ans.push_back(ins[i]);
    return ans;
  }
};
