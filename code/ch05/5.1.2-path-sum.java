public class TreeNode {
  int val;
  TreeNode left;
  TreeNode right;

  TreeNode(int x) {
    val = x;
  }
}

class Solution {
  public boolean hasPathSum(TreeNode root, int sum) {
    if (root == null) return false;

    Deque<Pair<TreeNode, Integer>> stack = new ArrayDeque<Pair<TreeNode, Integer>>();
    stack.addLast(new Pair<TreeNode, Integer>(root, sum - root.val));

    while (!stack.isEmpty()) {
      Pair<TreeNode, Integer> top = stack.removeLast();
      TreeNode node = top.getKey();
      int remain = top.getValue();

      if ((node.right == null) && (node.left == null) && (remain == 0)) return true;
      if (node.right != null) {
        stack.addLast(new Pair<TreeNode, Integer>(node.right, remain - node.right.val));
      }
      if (node.left != null) {
        stack.addLast(new Pair<TreeNode, Integer>(node.left, remain - node.left.val));
      }
    }

    return false;
  }
}