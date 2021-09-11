
#include <vector>
#include <string>
#include <map>
#include <queue>
#include <set>
using namespace std;

class Solution {
public:
  void flip(map<string, string>& mapper, vector<string>& state, int i, int m, int n) {
    state[i] = mapper[state[i]];
    if (i % n != 0)
      state[i - 1] = mapper[state[i - 1]];
    if (i % n < n - 1)
      state[i + 1] = mapper[state[i + 1]];
    if (i >= n)
      state[i - n] = mapper[state[i - n]];
    if (i < (m - 1) * n)
      state[i + n] = mapper[state[i + n]];
  }
  int minFlips(vector<vector<int> >& mat) {
    map<string, string> mapper;
    int m = mat.size();
    int n = mat[0].size();
    string target(""), cur("");
    for (int i = 0; i < m; i++)
      for (int j = 0; j < n; j++) {
        target += "0";
        cur += to_string(mat[i][j]);
      }
    queue<string> q;
    q.push(cur);
    set<string> visited;
    int steps = 0;
    mapper["0"] = "1";
    mapper["1"] = "0";
    while (!q.empty()) {
      int last_q_size = q.size();
      for (int flg = 0; flg < last_q_size; flg++) {
        cur = q.front();
        q.pop();
        if (cur == target) return steps;
        if (visited.count(cur)) continue;
        visited.insert(cur);
        for (int j = 0; j < cur.length(); j++) {
          vector<string> s;
          for (int ww = 0; ww < cur.length(); ww++)
            s.push_back(string(1, cur[ww]));
          flip(mapper, s, j, m, n);
          string to_add("");
          for (int ww = 0; ww < s.size(); ww++)
            to_add += s[ww];
          q.push(to_add);
        }
      }
      steps += 1;
    }
    return -1;
  }
};

