public class SudokuSolver {
    public void solveSudoku(char[][] board) {
        boolean rowState[][] = new boolean[9][10];
        boolean columnState[][] = new boolean[9][10];
        boolean boxState[][] = new boolean[9][10];
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] != '.') {
                    int index = board[i][j] - '0';
                    rowState[i][index] = true;
                    columnState[j][index] = true;
                    boxState[(i / 3) * 3 + j / 3][index] = true;
                }
            }
        }
        recursivePlaceNumber(board, rowState, columnState, boxState, 0, 0);
    }

    private boolean recursivePlaceNumber(char[][] board, boolean[][] rowState, boolean[][] columnState, boolean[][] boxState, int row, int column) {
        if (column == 9) {
            column = 0;
            row++;
            if (row == 9) {
                // game complete
                return true;
            }
        }

        if (board[row][column] != '.') {
            return recursivePlaceNumber(board, rowState, columnState, boxState, row, column + 1);
        } else {
            for (int i = 1; i < 10; i++) {
                if (rowState[row][i] || columnState[column][i] || boxState[(row / 3) * 3 + column / 3][i]) {
                    continue;
                } else {
                    placeNumber(board, rowState, columnState, boxState, row, column, i);
                    if (recursivePlaceNumber(board, rowState, columnState, boxState, row, column + 1)) {
                        return true;
                    }
                    undoNumberPlacement(board, rowState, columnState, boxState, row, column, i);
                }
            }
        }
        // failed to get an answer
        return false;
    }

    private void placeNumber(char[][] board, boolean[][] rowState, boolean[][] columnState, boolean[][] boxState, int row, int column, int i) {
        rowState[row][i] = true;
        columnState[column][i] = true;
        boxState[(row / 3) * 3 + column / 3][i] = true;
        board[row][column] = (char) ('0' + i);
    }

    private void undoNumberPlacement(char[][] board, boolean[][] rowState, boolean[][] columnState, boolean[][] boxState, int row, int column, int i) {
        rowState[row][i] = false;
        columnState[column][i] = false;
        boxState[(row / 3) * 3 + column / 3][i] = false;
        board[row][column] = '.';
    }
}