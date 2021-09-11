from typing import List


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def maxPathSum(self, root: TreeNode) -> int:
        self.maxSum = float("-inf")

        def helper(root: TreeNode):
            if not root:
                return 0

            maxLeft = max(helper(root.left), 0)
            maxRight = max(helper(root.right), 0)
            self.maxSum = max(self.maxSum, maxLeft + maxRight + root.val)

            return root.val + max(maxLeft, maxRight)

        helper(root)
        return self.maxSum
