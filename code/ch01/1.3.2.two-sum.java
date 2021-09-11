class Solution {
  public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> mapper = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
      if (mapper.containsKey(target - nums[i])) {
        return new int[] {mapper.get(target - nums[i]), i};
      }
      mapper.put(nums[i], i);
    }
    return new int[] {};
  }
}
