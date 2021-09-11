class Solution {
  public int[] dailyTemperatures(int[] T) {
    Stack<Integer> stack = new Stack<Integer>();
    int[] ans = new int[T.length];
    for (int i = 0; i < T.length; i++) {
      while (!stack.empty() && T[i] > T[stack.peek()]) {
        int top = stack.pop();
        ans[top] = i - top;
      }
      stack.push(i);
    }
    return ans;
  }
}
