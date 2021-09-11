class Solution:
    def sequentialDigits(self, low: int, high: int) -> List[int]:
        numbers = "123456789"
        ins = []
        n = len(numbers)
        for i in range(1, n):
            for j in range(n - i):
                ins.append(int(numbers[j : i + j + 1]))
        return [x for x in ins if x >= low and x <= high]
