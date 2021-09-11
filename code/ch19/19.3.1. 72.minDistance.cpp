#include <string>
#include <algorithm>
#include <map>
#include <utility>
using namespace std;

class Solution {
public:
  int helper(string word1, int s1, int e1,
      string word2, int s2, int e2,
      map<pair<int, int>, int>& memo) {
    if (s1 > e1) return e2 - s2 + 1;
    else if (s2 > e2) return e1 - s1 + 1;
    char c1 = word1[s1], c2 = word2[s2];
    pair<int, int> key = make_pair(s1, s2);
    if (memo.count(key)) return memo[key];
    if (c1 == c2)
      return memo[key] = helper(word1, s1 + 1, e1, word2,
          s2 + 1, e2, memo);
    else
      return memo[key] = min(min(helper(word1, s1 + 1,
            e1, word2, s2, e2, memo), helper(word1,
              s1, e1, word2, s2 + 1, e2, memo)), helper(
              word1, s1 + 1, e1, word2, s2 + 1, e2, memo
              )) + 1;
  }
  int minDistance(string word1, string word2) {
    map<pair<int, int>, int> dict;
    return helper(word1, 0, word1.size() - 1,
        word2, 0, word2.size() - 1, dict);
  }
};
