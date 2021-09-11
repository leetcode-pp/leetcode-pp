#include <string>
#include <vector>
#include <algorithm>
#include <cstdlib>
#include <cstdio>
using namespace std;

struct my_str {
  string str;
  my_str(int num): str(to_string(num)) {}
  bool operator < (const my_str& rhs) const {
    return str + rhs.str > rhs.str + str;
  }
};

class Solution {
public:
  string largestNumber(const vector<int>& nums) {
    vector<my_str> s;
    for (int i = 0; i < nums.size(); i++)
      s.push_back(my_str(nums[i]));
    sort(s.begin(), s.end());
    string ans("");
    for (int i = 0; i < nums.size(); i++)
      ans += s[i].str;
    string real_ans("");
    bool flag = false;
    for (int i = 0; i < ans.length(); i++) {
      if (!flag) flag = !(ans[i] == '0');
      if (flag) real_ans.push_back(ans[i]);
    }
    if (!flag) return string("0");
    else return real_ans;
  }
};
