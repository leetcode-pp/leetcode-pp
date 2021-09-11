class Solution {
  private void backtrack(
      List<List<Integer>> ans, ArrayList<Integer> tempList, ArrayList<Integer> nums) {
    if (tempList.size() == nums.size()) {
      ans.add(new ArrayList<Integer>(tempList));
      return;
    }
    for (int i = 0; i < nums.size(); i++) {
      if (tempList.contains(nums.get(i))) continue;
      tempList.add(nums.get(i));
      backtrack(ans, tempList, nums);
      tempList.remove(tempList.size() - 1);
    }
  }

  public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> ans = new LinkedList();
    ArrayList<Integer> tempList = new ArrayList<Integer>();
    ArrayList<Integer> anums = new ArrayList<Integer>();
    for (int num : nums) anums.add(num);
    backtrack(ans, tempList, anums);
    return ans;
  }
}
