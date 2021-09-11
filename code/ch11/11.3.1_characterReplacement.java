class Solution {
    public int characterReplacement(String s, int k) {
        int res = 0, left = 0, right = 0;
        int[] counts = new int[26];

        while( right < s.length()) {
            counts[s.charAt(right) - 'A']++;
            int maxCharCount = getMostCharCount(counts);
            right++;
            if (right - left - maxCharCount > k) {
                counts[s.charAt(left) - 'A']--;
                left++;
            }
        }
        return right - left;
    }

    private int getMostCharCount(int[] counts) {
        int ans = 0;
        for (int n : counts)
            ans = Math.max(ans, n);
        return ans;
    }
}