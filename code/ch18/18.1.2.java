# 查找第一个大于等于 x 的元素
public int bs(int[] nums, int x) {
	int l = 0, h = nums.length - 1;
	while (l <= h) {
		int mid = l + (h - l) / 2;
		if (l == h) {
			break;
		} else if (nums[mid] >= x) {
			h = mid;
		} else {
			l = mid + 1;
		}
	}
	return nums[l];
}

