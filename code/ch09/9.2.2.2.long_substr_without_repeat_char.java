class Solution {
    public int lengthOfLongestSubstring(String s) {
        int res = 0;
        for (int left = 0; left < s.length(); left++) {
            Set<Character> set = new HashSet<>();
            int right = left;
            while (right < s.length()) {
                if (set.contains(s.charAt(right)))
                    break;
                else {
                    set.add(s.charAt(right));
                    res = Math.max(res, right - left + 1);
                    right++;
                }
            }
        }
        return res;
    }
}