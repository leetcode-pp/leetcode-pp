class MinStack:
    def __init__(self):
        """
        initialize your data structure here.
        """
        self.stack = []
        self.min = float('inf')

    def push(self, x: int) -> None:
        if not self.stack:
            self.min = x
            self.stack.append(0)
        else:
            self.stack.append(x - self.min)
            if x < self.min: self.min = x

    def pop(self) -> None:
        if not self.stack: return

        top = self.stack.pop()
        if top < 0:
            self.min = self.min - top

    def top(self) -> int:
        top = self.stack[-1]
        if top < 0: return self.min
        
        return top + self.min

    def getMin(self) -> int:
        return self.min
