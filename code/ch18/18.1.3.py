# 查找最后一个小于等于 x 的元素
def bs(nums: List[int], x: int) -> int:
    l, h = 0, len(nums) - 1
    while l <= h:
        mid = l + (h - l) // 2
        if l == h or l + 1 == h:
            break
        elif nums[mid] <= x:
            l = mid
        else:
            h = mid - 1
    if nums[h] <= x:
        return nums[h]
    else:
        return nums[l]
