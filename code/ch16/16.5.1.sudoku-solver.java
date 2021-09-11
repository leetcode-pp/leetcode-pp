class Solution {
    
    boolean[][] col = new boolean[9][9];
    boolean[][] row = new boolean[9][9];
    boolean[][] place = new boolean[9][9];
    
    public void solveSudoku(char[][] board) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == '.') {
                    continue;
                }
                int num = board[i][j] - '1';
                row[i][num] = true;
                col[j][num] = true;
                place[i / 3 * 3 + j / 3][num] = true;
            }
        }
        dfs(board, 0, 0);
    }
    
    public boolean dfs(char[][] board, int i, int j) {
        if (j == 9) {
            return dfs(board, i + 1, 0);
        } else if (i == 9) {
            return true;
        } else if (board[i][j] != '.') {
            return dfs(board, i, j + 1);
        }

        for (int k = 0; k < 9; k++) {
            if (col[j][k] || row[i][k] || place[i / 3 * 3 + j / 3][k]) {
                continue;
            }
            board[i][j] = (char)('1' + k);
            col[j][k] = true;
            row[i][k] = true;
            place[i / 3 * 3 + j / 3][k] = true;
            if (dfs(board, i, j + 1)) {
                return true;
            }
            board[i][j] = '.';
            col[j][k] = false;
            row[i][k] = false;
            place[i / 3 * 3 + j / 3][k] = false;
        }
        return false;
    }
  
}