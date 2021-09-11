# 查找第一个大于等于 x 的元素
def bs(nums: List[int], x: int) -> int:
    l, h = 0, len(nums) - 1
    while l <= h:
        mid = l + (h - l) // 2
        if l == h:
            break
        elif nums[mid] >= x:
            h = mid
        else:
            l = mid + 1
    return nums[l]
