public class Solution {
    // you need to treat n as an unsigned value
    public int hammingWeight(int n) {
        int retVal = 0;
        int mask = 1;
        for (int i = 0; i < 32; i++) {
            if ((n & mask) != 0) {
                retVal++;
            }
            mask <<= 1;
        }
        return retVal;
    }
}