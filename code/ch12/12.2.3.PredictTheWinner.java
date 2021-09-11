package ch12.code;

public class 12.2.3.PredictTheWinner {
    public boolean PredictTheWinner(int[] nums) {
        if (nums.length == 1 || nums.length % 2 == 0)
            return true;

        int[] dp = new int[nums.length];

        for (int i = nums.length - 1; i >= 0; i--) {
            dp[i] = nums[i];
            for (int j = i + 1; j < nums.length; j++)
                dp[j] = Math.max(nums[i] - dp[j], nums[j] - dp[j - 1]);
        }
        return dp[nums.length - 1] >= 0;
    }
}