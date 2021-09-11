class Solution {
    public int getSum(int a, int b) {
        while (b != 0) {
            int carry = (a & b) << 1;
            int temp = a ^ b;

            a = temp;
            b = carry;
        }
        return a;
    }
}