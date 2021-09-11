public int bs(int[] nums, int x) {
    int l = 0, h = nums.length - 1;
    while (l <= h) {
        int mid = l + (h - l) / 2;
        if (l == h || l + 1 == h) {
            break;
        } else if (nums[mid] <= x) {
            l = mid;
        } else {
            h = mid - 1;
        }
    }
    if (nums[h] <= x) {
        return nums[h];
    } else {
        return nums[l];
    }
}