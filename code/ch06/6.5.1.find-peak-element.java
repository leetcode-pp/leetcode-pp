class Solution {
    public int findPeakElement(int[] nums) {
        int n = nums.length;
        int l = 0, h = n - 1;
        while (l <= h) {
            int mid = l + (h - l) / 2;
            if (mid + 1 < n && nums[mid] < nums[mid + 1]) {
                l = mid + 1;
            } else if (mid - 1 >= 0 && nums[mid] < nums[mid - 1]) {
                h = mid - 1;
            } else {
                return mid;
            }
        }
        return -1;
    }
}
