class Solution {
private:
    int get_neighbor_count(int i, int j, vector<vector<int>>& board) {
        int top = std::max(0, i - 1);
        int bottom = std::min<int>(board.size() - 1, i + 1);
        int left = std::max(0, j - 1);
        int right = std::min<int>(board[0].size() - 1, j + 1);
        
        int count = 0;
        for (int x = top; x < bottom + 1; x++)
            for (int y = left; y < right + 1; y++)
                if (board[x][y] == 1 || board[x][y] == -1)
                    count += 1;
        
        return count;
    }
public:
    void gameOfLife(vector<vector<int>>& board) {
        for (int i = 0; i < board.size(); i++) {
            for (int j = 0; j < board[0].size(); j++) {
                int res = get_neighbor_count(i, j, board);
                if (board[i][j] == 1 && (res == 3 || res == 4))
                    board[i][j] = 1;
                else if (board[i][j] == 1)
                    board[i][j] = -1;
                else if (board[i][j] == 0 && res == 3)
                    board[i][j] = -2;
            }
        }
        
        for (int i = 0; i < board.size(); i++) {
            for (int j = 0; j < board[0].size(); j++) {
                if (board[i][j] == -2)
                    board[i][j] = 1;
                else if (board[i][j] == -1)
                    board[i][j] = 0;
            }
        }
    }
};
