class Solution {
    public int integerReplacement(int n) {
        if (n == 1)
            return 0;
        if (n == Integer.MAX_VALUE)
            return 32;
        int count = 0;
        while (n > 3) {
            if (n % 2 == 0)
                n >>= 1;
            else if ((n + 1) % 4 == 0) 
                n += 1;
            else
                n -= 1;
            count++;
        }

        return n == 3 ? count + 2 : count + 1; // 处理 n==3 的特殊情况
    }
}