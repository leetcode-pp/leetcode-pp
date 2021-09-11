package ch04.code;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TwentyFourGame {
    public boolean judgePoint24(int[] nums) {
        double[] nums1 = new double[nums.length];
        for (int i = 0; i < nums.length; i++) {
            nums1[i] = nums[i];
        }
        return helper(nums1, 4);
    }

    private boolean helper(double[] nums, int n) {
        if (n == 1)
            return Math.abs(nums[0] - 24) <= 1e-6;

        double newNums[] = new double[4];

        for (int left = 0; left < n - 1; left++) {
            for (int right = left + 1; right < n; right++) {
                int m = 0;
                // put all other num at the beginning first
                for (int k = 0; k < n; k++) {
                    if (k != left && k != right)
                        newNums[m++] = nums[k];
                }
                // put newNum in after + = * /
                newNums[m] = nums[left] + nums[right];
                if (helper(newNums, m + 1))
                    return true;
                newNums[m] = nums[left] - nums[right];
                if (helper(newNums, m + 1))
                    return true;
                newNums[m] = nums[right] - nums[left];
                if (helper(newNums, m + 1))
                    return true;
                newNums[m] = nums[left] * nums[right];
                if (helper(newNums, m + 1))
                    return true;
                if (nums[right] != 0) {
                    newNums[m] = nums[left] / nums[right];
                    if (helper(newNums, m + 1))
                        return true;
                }
                if (nums[left] != 0) {
                    newNums[m] = nums[right] / nums[left];
                    if (helper(newNums, m + 1))
                        return true;
                }
            }
        }
        return false;
    }
}