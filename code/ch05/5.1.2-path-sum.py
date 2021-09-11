class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def hasPathSum(self, root: TreeNode, sum: int) -> bool:
        if root is None:
            return False

        stack = [(root, sum - root.val)]
        while stack:
            node, remain = stack.pop()
            if not node.left and not node.right and remain == 0:
                return True
            if node.right:
                stack.append((node.right, remain - node.right.val))
            if node.left:
                stack.append((node.left, remain - node.left.val))
        return False
