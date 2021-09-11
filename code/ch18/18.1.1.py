# 查找 nums 数组中元素值为 target 的下标，如果不存在则返回 -1
def bs(nums: [], target: int) -> int:
    n = len(nums)
    l, h = 0, n - 1
    while l <= h:
        mid = l + (h - l) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            l = mid + 1
        else:
            h = mid - 1
    return -1
