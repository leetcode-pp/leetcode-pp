class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
        val = x;
    }
}

public class Solution {
    public List<List<Integer>> pathSum(TreeNode root, int sum) {
        List<List<Integer>> res = new ArrayList<>();

        if(root == null) return res;

        Deque<Integer> path = new ArrayDeque<>();
        Deque<Pair<TreeNode, Integer>> stack = new ArrayDeque<>();

        stack.addLast(new Pair<TreeNode, Integer>(root, root.val));
        path.addLast(root.val)

        while (!stack.isEmpty()) {
            Pair<TreeNode, Integer> top = stack.removeLast();
            TreeNode node = top.getKey();
            int total = top.getValue();

            if ((node.right == null) && (node.left == null) && (total == sum)) {
                res.add(new ArrayList<>(path));
            }
            if (node.right != null) {
                stack.addLast(new Pair<TreeNode, Integer>(node.right, total + node.right.val));
                path.addLast(node.right.val);
            }
            if (node.left != null) {
                stack.addLast(new Pair<TreeNode, Integer>(node.left, total + node.left.val));
                path.addLast(node.left.val);
            }
        }

        return res;
    }
}