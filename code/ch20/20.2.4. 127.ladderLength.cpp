#include <vector>
#include <string>
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
    int steps = 1, L = beginWord.length();
    while (!q.empty()) {
      int last_q_size = q.size();
      for (int flg = 0; flg < last_q_size; flg++) {
        string cur = q.front();
        q.pop();
        if (visited.count(cur)) continue;
        visited.insert(cur);
        if (cur == endWord) return steps;
        for (int i = 0; i < L; i++)
          for (int j = 0; j < 26; j++) {
            string s = cur;
            s[i] = 'a' + j;
            for (int k = 0; k < wordList.size(); k++) {
              string& word = wordList[k];
              if (word == s)
                q.push(word);
            }
          }
      }
      steps += 1;
    }
    return 0;
  }
};
