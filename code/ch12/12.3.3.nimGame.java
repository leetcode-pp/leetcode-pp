package ch12.code;

public class NimGame {
    public boolean canWinNim(int n) {
        if (n <= 0) {
            return false;
        }
        return 0 != n % 4;
    }
}