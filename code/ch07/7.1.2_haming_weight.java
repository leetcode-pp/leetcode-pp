public class Solution {
    // you need to treat n as an unsigned value
    public int hammingWeight2(int n) {
        int retVal = 0;
        while (n != 0) {
            n = n & (n - 1);
            retVal++;
        }
        return retVal;
    }
}