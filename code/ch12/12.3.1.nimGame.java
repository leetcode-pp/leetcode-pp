package ch12.code;

public class NimGame {
    public boolean canWinNim(int n) {
        boolean[] mem = new boolean[n + 1];
        mem[1] = true;
        mem[2] = true;
        mem[3] = true;

        for (int i = 4; i < n + 1; i++) {
            if (!(mem[i - 1] && mem[i - 2] && mem[i - 3]))
                mem[i] = true;
        }
        return mem[n];
    }
}