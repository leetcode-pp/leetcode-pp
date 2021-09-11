#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
  vector<int> sequentialDigits(int low, int high) {
    string numbers("123456789");
    vector<int> ins;
    int n = numbers.length();
    for (int i = 1; i < n; i++)
      for (int j = 0; j < n - i; j++)
        ins.push_back(atoi(numbers.substr(j, i + 1).c_str()));
    vector<int>::iterator st = lower_bound(ins.begin(), ins.end(), low);
    vector<int>::iterator ed = upper_bound(ins.begin(), ins.end(), high);
    vector<int> ans;
    while (st != ed) ans.push_back(*st++);
    return ans;
  }
};
