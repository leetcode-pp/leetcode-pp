class Solution:
    def kthSmallest(self, root: TreeNode, k: int) -> int:
        # 返回该节点以及其所有子节点的个数
        def countNodes(node) -> int:
            if node == None:
                return 0
            l = countNodes(node.left)
            r = countNodes(node.right)
            return l + r + 1

        cnt = countNodes(root.left)
        if cnt == k - 1:
            return root.val
        elif cnt > k - 1:
            return self.kthSmallest(root.left, k)

        return self.kthSmallest(root.right, k - cnt - 1)
