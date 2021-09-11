#include <vector>
#include <string>
#include <map>
#include <queue>
#include <set>
using namespace std;

class Solution {
public:
  int ladderLength(string beginWord, string endWord,
      vector<string>& wordList) {
    queue<string> q;
    q.push(beginWord);
    set<string> visited;
    int steps = 1, n = wordList.size(), L = beginWord.length();
    map<string, vector<string> > wizards;
    for (int i = 0; i < n; i++) {
      string word = wordList[i];
      for (int j = 0; j < L; j++) {
        string key = word.substr(0, j) + string("*") + \
                     word.substr(j + 1,
                         word.length() - j - 1);
        if (!wizards.count(key))
          wizards[key] = vector<string>();
        wizards[key].push_back(word);
      }
    }
    while (!q.empty()) {
      int last_q_size = q.size();
      for (int flg = 0; flg < last_q_size; flg++) {
        string cur = q.front();
        q.pop();
        if (visited.count(cur)) continue;
        visited.insert(cur);
        if (cur == endWord) return steps;
        for (int i = 0; i < L; i++) {
          string key = cur.substr(0, i) + string("*") + \
                       cur.substr(i + 1,
                           cur.length() - i - 1);
          if (!wizards.count(key)) continue;
          for (int j = 0; j < wizards[key].size(); j++)
            q.push(wizards[key][j]);
        }
      }
      steps += 1;
    }
    return 0;
  }
};
