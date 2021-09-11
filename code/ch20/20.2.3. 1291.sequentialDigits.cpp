#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
  vector<int> sequentialDigits(int low, int high) {
    vector<int> ins {
            12,
            23,
            34,
            45,
            56,
            67,
            78,
            89,
            123,
            234,
            345,
            456,
            567,
            678,
            789,
            1234,
            2345,
            3456,
            4567,
            5678,
            6789,
            12345,
            23456,
            34567,
            45678,
            56789,
            123456,
            234567,
            345678,
            456789,
            1234567,
            2345678,
            3456789,
            12345678,
            23456789,
            123456789,
    };
    vector<int>::iterator st = lower_bound(ins.begin(),
        ins.end(), low);
    vector<int>::iterator ed = upper_bound(ins.begin(),
        ins.end(), high);
    vector<int> ans;
    while (st != ed) ans.push_back(*st++);
    return ans;
  }
};
