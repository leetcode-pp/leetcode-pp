from typing import List


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def pathSum(self, root: TreeNode, sum: int) -> List[List[int]]:
        def helper(root: TreeNode, sum: int, path: List):
            if not root:
                return
            if not root.left and not root.right and sum - root.val == 0:
                path += [root.val]
                ans.append(path)
            helper(root.left, sum - root.val, path + [root.val])
            helper(root.right, sum - root.val, path + [root.val])

        ans = []
        helper(root, sum, [])
        return ans
