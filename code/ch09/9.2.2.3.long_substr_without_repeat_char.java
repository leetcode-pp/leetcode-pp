class Solution {
    public int lengthOfLongestSubstring(String s) {
        int res = 0, left = 0, right = 0;
        Set<Character> set = new HashSet<>();
        while (right < s.length()) {
            if (set.contains(s.charAt(right)))
                while (left < right) {
                    if (s.charAt(left) == s.charAt(right)) {
                        set.remove(s.charAt(left));
                        left++;
                        break;
                    }
                    set.remove(s.charAt(left));
                    left++;
                }

            set.add(s.charAt(right));
            res = Math.max(res, right - left + 1);
            right++;
        }

        return res;
    }
}