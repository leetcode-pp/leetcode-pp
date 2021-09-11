#include <string>
#include <map>
#include <algorithm>
#include <cstring>
using namespace std;

class Solution {
public:
  int maxFreq(string s, int maxLetters, int minSize,
      int maxSize) {
    map<string, int> counter;
    int res = 0;
    for (int i = 0; i < s.size() - minSize + 1; i++)
      for (int length = minSize; length <= maxSize; length++) {
        if (i + length > s.length()) break;
        bool alpha[26];
        memset(alpha, 0, sizeof(alpha));
        int cnt = 0;
        string sub("");
        for (int ww = 0; ww < length; ww++) {
          sub.push_back(s[i + ww]);
          if (!alpha[s[i + ww] - 'a']) {
            ++cnt;
            alpha[s[i + ww] - 'a'] = true;
          }
        }
        if (cnt <= maxLetters) {
          int buf_val;
          buf_val = counter[sub] = (counter.count(sub) ? \
              counter[sub] : 0) + 1;
          res = max(res, buf_val);
        }
      }
    return res;
  }
};
