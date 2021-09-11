#include <utility>
#include <map>
using namespace std;

class Solution {
public:
  map<pair<int, int>, int> visited;
  int uniquePaths(int m, int n) {
    if (visited.count(make_pair(m, n)))
      return visited[make_pair(m, n)];
    if (m == 1 || n == 1) return 1;
    int cnt = uniquePaths(m - 1, n) + \
              uniquePaths(m, n - 1);
    return visited[make_pair(m, n)] = cnt;
  }
};
