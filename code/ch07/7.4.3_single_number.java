class Solution {
    public int singleNumber(int[] nums) {
        int distinctSum = Arrays.stream(nums).distinct().sum();
        int sum = Arrays.stream(nums).sum();
        return distinctSum * 2 - sum;
    }
}
