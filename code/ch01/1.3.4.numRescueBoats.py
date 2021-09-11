def binarySearch(nums, target):
    # 左右都闭合的区间 [l, r]
    l, r = 0, len(nums) - 1
    while l <= r:
        mid = (left + right) >> 1
        if nums[mid] == target:
            return mid
        # 搜索区间变为 [mid+1, right]
        if nums[mid] < target:
            l = mid + 1
        # 搜索区间变为 [left, mid - 1]
        if nums[mid] > target:
            r = mid - 1
    return -1