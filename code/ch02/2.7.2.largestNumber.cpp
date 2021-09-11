#include <vector>
#include <algorithm>
#include <cstdio>
#include <string>
#include <cstdlib>
using namespace std;

string largestNumber(const vector<int>& nums) {
  vector<string> s;
  for (int i = 0; i < nums.size(); i++)
    s.push_back(to_string(nums[i]));
  // clang++/g++: need parameter '-std=c++11'
  sort(s.begin(), s.end(), [](string a, string b)
      -> bool {
      return a + b > b + a;
      });
  string ans("");
  for (int i = 0; i < nums.size(); i++)
    ans += s[i];
    string real_ans("");
    bool flag = false;
    for (int i = 0; i < ans.length(); i++) {
      if (!flag) flag = !(ans[i] == '0');
      if (flag) real_ans.push_back(ans[i]);
    }
    if (!flag) return string("0");
    else return real_ans;
}
