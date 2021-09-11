package ch12.code;

public class NimGame {
    public boolean canWinNim(int n) {
        if (n < 4)
            return true;

        boolean a = true, b = true, c = true;

        for (int i = 4; i < n + 1; i++) {
            boolean current = a && b && c ? false : true;
            a = b;
            b = c;
            c = current;
        }

        return c;
    }
}