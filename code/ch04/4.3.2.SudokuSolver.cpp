class Solution {
private:
    vector<vector<bool>> row_state;
    vector<vector<bool>> column_state;
    vector<vector<bool>> box_state;

private:
    pair<int, int> getMaxPossibleCoordinate(vector<vector<char>>& board) {
        int x = -1, y = -1, min_count = 9;
        for (int i = 0; i < 9; i++)
            for (int j = 0; j < 9; j++) {
                if (board[i][j] != '.') continue;
                int tmp_count = 9;
                for (int k = 0; k < 9; k++) {
                    if (row_state[i][k] || column_state[j][k] || box_state[(i / 3) * 3 + j / 3][k])
                        tmp_count -= 1;
                }
                
                if (tmp_count == 1) return make_pair(i, j);
                if (min_count > tmp_count) {
                    min_count = tmp_count;
                    x = i;
                    y = j;
                }
            }
        
        return make_pair(x, y);
    }

    void placeNumber(vector<vector<char>>& board, int row, int column, int i) {
        board[row][column] = i + '0';
        row_state[row][i]    = true;
        column_state[column][i] = true;
        box_state[((row / 3) * 3) + (column / 3)][i] = true;
    }

    void undoNumberPlace(vector<vector<char>>& board, int row, int column, int i) {
        board[row][column] = '.';
        row_state[row][i] = false;
        column_state[column][i] = false;
        box_state[((row / 3) * 3) + (column / 3)][i] = false;
    }

    void initialState(vector<vector<char>>& board) {
        for (int i = 0; i < 9; i++)
            for (int j = 0; j < 9; j++)
                if (board[i][j] != '.') {
                    row_state[i][board[i][j] - '0']     = true;
                    column_state[j][board[i][j] - '0']  = true;
                    box_state[(i / 3) * 3 + j / 3][board[i][j] - '0'] = true;
                }
    }

    bool recursivePlaceNumber(vector<vector<char>>& board, int row, int column) {
        if (row == -1 and column == -1) return true;
        if (board[row][column] != '.') return false;

        for (int i = 1; i < 10; i ++) {
            if (row_state[row][i] ||
                column_state[column][i] ||
                box_state[(row / 3) * 3 + column / 3][i]) {
                continue;
            } else {
                placeNumber(board, row, column, i);
                pair<int, int> coordinate = getMaxPossibleCoordinate(board);
                if (recursivePlaceNumber(board, coordinate.first, coordinate.second))
                    return true;
                undoNumberPlace(board, row, column, i);
            }
        }
        
        return false;
    }

public:
    void solveSudoku(vector<vector<char>>& board) {
        row_state    = vector<vector<bool>>(9, vector<bool>(10, false));
        column_state = vector<vector<bool>>(9, vector<bool>(10, false));
        box_state    = vector<vector<bool>>(9, vector<bool>(10, false));
        
        initialState(board);

        pair<int, int> coor = getMaxPossibleCoordinate(board);
        
        recursivePlaceNumber(board, coor.first, coor.second);
    }
};
