#include <string>
#include <algorithm>
#include <map>
#include <cstring>
using namespace std;

class Solution {
public:
  int maxFreq(string s, int maxLetters, int minSize, \
      int maxSize) {
    map<string, int> counter;
    int res = 0;
    for (int i = 0; i <= s.length() - minSize; i++) {
      string sub = s.substr(i, minSize);
      bool alpha[26];
      memset(alpha, 0, sizeof(alpha));
      int cnt = 0;
      for (int ww = 0; ww < sub.length(); ww++)
        if (!alpha[sub[ww] - 'a']) {
          ++cnt;
          alpha[sub[ww] - 'a'] = true;
        }
      if (cnt <= maxLetters) {
        counter[sub] = (counter.count(sub) ? \
            counter[sub] : 0);
        counter[sub] += 1;
        res = max(res, counter[sub]);
      }
    }
    return res;
  }
};
