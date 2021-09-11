class Solution {
    public int integerReplacement(int n) {
        if (n == 1)
            return 0;
        if (n == Integer.MAX_VALUE)
            return 32;
        int count = 0;
        while (n > 3) {
            if ((n & 1) == 0) //判断是 0 或 1
                n >>= 1;
            else if ((n & 2) == 0) // 已经确定最后一位是1，判断是01 还是11
                n -= 1;
            else
                n += 1;
            count++;
        }
        return n == 3 ? count + 2 : count + 1; // 处理 n==3 的特殊情况
    }
}