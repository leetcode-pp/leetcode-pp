package ch12.code;

public class 12.2.1.PredictTheWinner {
    public boolean PredictTheWinner(int[] nums) {
        int sum = 0;
        for (int i : nums)
            sum += i;
        int[][] mem = new int[nums.length][nums.length];
        return sum <= findMax(0, nums.length - 1, nums, mem) * 2;
    }

    private int findMax(int l, int r, int[] nums, int[][] mem) {
        if (l < 0 || l > r)
            return 0;
        if (mem[l][r] != 0)
            return mem[l][r];

        if (l == r) {
            mem[l][r] = nums[l];
            return nums[l];
        }
        mem[l][r] = Math.max(nums[l] + Math.min(findMax(l + 1, r - 1, nums, mem), findMax(l + 2, r, nums, mem)),
                nums[r] + Math.min(findMax(l + 1, r - 1, nums, mem), findMax(l, r - 2, nums, mem)));
        return mem[l][r];
    }
}