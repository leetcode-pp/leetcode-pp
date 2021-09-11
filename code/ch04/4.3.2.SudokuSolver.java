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
        int[] coordinate = getMaxPossibleCoordinate(board, rowState, columnState, boxState);

        recursivePlaceNumber2(board, rowState, columnState, boxState, coordinate[0], coordinate[1]);
    }

    private int[] getMaxPossibleCoordinate(char[][] board, boolean[][] rowState, boolean[][] columnState, boolean[][] boxState) {
        int x = -1, y = -1, minCount = 9;
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] != '.') {
                    continue;
                }
                int tmpCount = 9;
                for (int k = 0; k < 9; k++) {
                    if (rowState[i][k] || columnState[j][k] || boxState[(i / 3) * 3 + j / 3][k])
                        tmpCount--;
                }
                if (tmpCount == 1)
                    return new int[]{i, j};

                if (minCount > tmpCount) {
                    minCount = tmpCount;
                    x = i;
                    y = j;
                }
            }
        }
        return new int[]{x, y};
    }

    private boolean recursivePlaceNumber2(char[][] board, boolean[][] rowState, boolean[][] columnState, boolean[][] boxState, int row, int column) {
        if (row == -1 && column == -1)
            return true;
        if (board[row][column] != '.')
            return false;

        for (int i = 1; i < 10; i++) {
            if (rowState[row][i] || columnState[column][i] || boxState[(row / 3) * 3 + column / 3][i]) {
                continue;
            } else {
                placeNumber(board, rowState, columnState, boxState, row, column, i);
                int[] coordinate = getMaxPossibleCoordinate(board, rowState, columnState, boxState);
                if (recursivePlaceNumber2(board, rowState, columnState, boxState, coordinate[0], coordinate[1])) {
                    return true;
                }
                undoNumberPlacement(board, rowState, columnState, boxState, row, column, i);
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