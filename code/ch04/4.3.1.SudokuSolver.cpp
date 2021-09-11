class Solution {
private:
    vector<vector<bool>> row_state;
    vector<vector<bool>> column_state;
    vector<vector<bool>> box_state;
    
private:
    void placeNumber(vector<vector<char>>& board, int row, int column, char d) {
        board[row][column] = d;
        row_state[row][d - '1']    = true;
        column_state[column][d - '1'] = true;
        box_state[((row / 3) * 3) + (column / 3)][d - '1'] = true;
    }

    void undoNumberPlace(vector<vector<char>>& board, int row, int column, char d) {
        board[row][column] = '.';
        row_state[row][d - '1'] = false;
        column_state[column][d - '1'] = false;
        box_state[((row / 3) * 3) + (column / 3)][d - '1'] = false;
    }

    void initialState(vector<vector<char>>& board) {
        for (int i = 0; i < 9; i++)
            for (int j = 0; j < 9; j++)
                if (board[i][j] != '.')
                    placeNumber(board, i, j, board[i][j]);
    }
    
    bool recursivePlaceNumber(vector<vector<char>>& board, int row, int column) {
        if (row == 9) return true;
        if (column == 9) return recursivePlaceNumber(board, row + 1, 0);
        if (board[row][column] != '.') return recursivePlaceNumber(board, row, column + 1);
        
        for (int i = '1'; i <= '9'; i++) {
            if (!(row_state[row][i - '1'] 
                  || column_state[column][i - '1'] 
                  || box_state[((row / 3) * 3) + (column / 3)][i - '1'])) {
                placeNumber(board, row, column, i);
                if (recursivePlaceNumber(board, row, column + 1) == true)
                    return true;
                undoNumberPlace(board, row, column, i);
            }
        }
        
        return false;
    }
public:
    void solveSudoku(vector<vector<char>>& board) {
        row_state    = vector<vector<bool>>(9, vector<bool>(9, false));
        column_state = vector<vector<bool>>(9, vector<bool>(9, false));
        box_state    = vector<vector<bool>>(9, vector<bool>(9, false));
        
        initialState(board);
        
        recursivePlaceNumber(board, 0, 0);
    }
};
