class Solution {
  public int countNodes(TreeNode node) {
    if (node == null) return 0;
    int l = countNodes(node.left);
    int r = countNodes(node.right);
    return l + r + 1;
  }
  public int kthSmallest(TreeNode root, int k) {
    int cnt = countNodes(root.left);
    if (cnt == k - 1) return root.val;
    else if (cnt > k - 1)
      return kthSmallest(root.left, k);
    else
      return kthSmallest(root.right, k - cnt - 1);
  }
}
