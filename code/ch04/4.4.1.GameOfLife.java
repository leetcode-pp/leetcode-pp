public class GameOfLife {
    public void gameOfLife(int[][] board) {
        // do in place life check
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[i].length; j++) {
                board[i][j] = checkLifeInPlace(board, board[i][j], i, j);
            }
        }
        // translate
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[i].length; j++) {
                if (board[i][j] == 2)
                    board[i][j] = 1;
                else if (board[i][j] == -1)
                    board[i][j] = 0;
            }
        }
    }

    private int checkLifeInPlace(int[][] board, int preState, int i, int j) {
        int neighborCount = getNeighborCountForInPlace(board, preState, i, j);
        if (neighborCount < 2 || neighborCount > 3)
            return preState == 0 ? 0 : -1;
        else if (neighborCount == 3)
            return preState == 1 ? 1 : 2;
        else
            return preState;
    }

    //      -1 as for 1 to 0;
    //      2 as for 0 to 1;
    private int getNeighborCountForInPlace(int[][] board, int preState, int i, int j) {
        int count = 0;
        int maxRow = board.length - 1, maxColumn = board[0].length - 1;

        if (i != 0) {
            count += board[i - 1][j] == 1 || board[i - 1][j] == -1 ? 1 : 0;
            if (j != 0) {
                count += board[i - 1][j - 1] == 1 || board[i - 1][j - 1] == -1 ? 1 : 0;
            }
            if (j != maxColumn) {
                count += board[i - 1][j + 1] == 1 || board[i - 1][j + 1] == -1 ? 1 : 0;
            }

        }

        if (i != maxRow) {
            count += board[i + 1][j] == 1 || board[i + 1][j] == -1 ? 1 : 0;
            if (j != 0) {
                count += board[i + 1][j - 1] == 1 || board[i + 1][j - 1] == -1 ? 1 : 0;
            }
            if (j != maxColumn) {
                count += board[i + 1][j + 1] == 1 || board[i + 1][j + 1] == -1 ? 1 : 0;
            }
        }

        if (j != 0) {
            count += board[i][j - 1] == 1 || board[i][j - 1] == -1 ? 1 : 0;
        }
        if (j != maxColumn) {
            count += board[i][j + 1] == 1 || board[i][j + 1] == -1 ? 1 : 0;
        }
        return count;
    }
}