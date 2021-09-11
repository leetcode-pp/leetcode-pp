class Solution {
    public int findMin(int[] nums) {
        int l = 0, h = nums.length - 1;
        while (l <= h) {
            int mid = l + (h - l) / 2;
            if (l == h) {
                return nums[l];
            } else if (nums[mid] > nums[h]) {
                l = mid + 1;
            } else {
                h = mid;
            }
        }
        return -1;
    }
}
