package ch10.code;

public class ClimbingStairs {
    public int climbStairs(int n) {
        if (n < 3)
            return n;

        int first = 1,second = 2;

        for (int i = 3; i < n + 1; i++) {
            second = first + second;
            first = second - first;
        }
        return second;
    }
}