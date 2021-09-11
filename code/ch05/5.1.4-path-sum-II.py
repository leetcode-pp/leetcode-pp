from typing import List


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def pathSum(self, root: TreeNode, sum: int) -> List[List[int]]:
        if not root:
            return []
        stack = [(root, [root.val], root.val)]
        ans = []
        while stack:
            node, path, total = stack.pop()
            if not node.right and not node.left and total == sum:
                ans.append(path)
            if node.right:
                stack.append((node.right, path + [node.right.val], total + node.right.val))
            if node.left:
                stack.append((node.left, path + [node.left.val], total + node.left.val))
        return ans
