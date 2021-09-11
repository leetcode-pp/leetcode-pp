class MinStack:
    def __init__(self):
        """
        initialize your data structure here.
        """
        self.stack = []
        self.helper = []

    def push(self, x: int) -> None:
        self.stack.append(x)
        if not self.helper or x < self.helper[-1][0]:
            self.helper.append([x, 1])
        else:
            self.helper[-1] = [self.helper[-1][0], self.helper[-1][1] + 1]

    def pop(self) -> None:
        if self.helper[-1][1] > 1:
            self.helper[-1] = [self.helper[-1][0], self.helper[-1][1] - 1]
        else:
            self.helper.pop()
        return self.stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.helper[-1][0]


# Your MinStack object will be instantiated and called as such:
obj = MinStack()
obj.push(1)
obj.pop()
param_3 = obj.top()
param_4 = obj.getMin()
