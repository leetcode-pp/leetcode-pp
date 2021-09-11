from typing import Optional
import random


class ListNode:
    def __init__(self, data: Optional[int] = None):
        self._data = data
        self._forwards = []


class Skiplist:

    _MAX_LEVEL = 16

    def __init__(self):
        self._level_count = 1
        self._head = ListNode()
        self._head._forwards = [None] * self._MAX_LEVEL

    def search(self, target: int) -> bool:
        p = self._head
        for i in range(self._level_count - 1, -1, -1):
            while p._forwards[i] and p._forwards[i]._data < target:
                p = p._forwards[i]

        if p._forwards[0] and p._forwards[0]._data == target:
            return True

        return False

    def add(self, num: int) -> None:
        level = self._random_level()
        if self._level_count < level:
            self._level_count = level
        new_node = ListNode(num)
        new_node._forwards = [None] * level
        update = [self._head] * self._level_count

        p = self._head
        for i in range(self._level_count - 1, -1, -1):
            while p._forwards[i] and p._forwards[i]._data < num:
                p = p._forwards[i]

            update[i] = p

        for i in range(level):
            new_node._forwards[i] = update[i]._forwards[i]
            update[i]._forwards[i] = new_node

    def erase(self, num: int) -> bool:
        update = [None] * self._level_count
        p = self._head
        for i in range(self._level_count - 1, -1, -1):
            while p._forwards[i] and p._forwards[i]._data < num:
                p = p._forwards[i]
            update[i] = p

        if p._forwards[0] and p._forwards[0]._data == num:
            for i in range(self._level_count - 1, -1, -1):
                if update[i]._forwards[i] and update[i]._forwards[i]._data == num:
                    update[i]._forwards[i] = update[i]._forwards[i]._forwards[i]
            return True

        while self._level_count > 1 and not self._head._forwards[self._level_count]:
            self._level_count -= 1

        return False

    def _random_level(self, p: float = 0.5) -> int:
        level = 1
        while random.random() < p and level < self._MAX_LEVEL:
            level += 1
        return level


# Your Skiplist object will be instantiated and called as such:
# obj = Skiplist()
# param_1 = obj.search(target)
# obj.add(num)
# param_3 = obj.erase(num)
