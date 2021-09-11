class Solution {
private:
    unordered_map<int, int> visited;
public:
    int integerReplacement(int n) {
        if (n == 1) return 0;
        
        if (visited.count(n) == 0) {
            if (n & 1 == 1)
                visited[n] = 2 + min(integerReplacement(n >> 1), integerReplacement((n >> 1) + 1));
            else
                visited[n] = 1 + integerReplacement(n >> 1);
        }
        
        return visited[n];
    }
};
