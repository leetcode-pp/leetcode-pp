def largestNumber(self, nums: List[int]) -> str:
    return str(int("".join(sorted(map(str, nums), cmp=lambda a, b: cmp(b + a, a + b)))))
