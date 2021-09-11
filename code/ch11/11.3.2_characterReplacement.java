class Solution {
    public int characterReplacement(String s, int k) {
        int res = 0, tmpMax = 0;
        int[] counts = new int[26];

        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'A']++;
            tmpMax = Math.max(tmpMax, counts[s.charAt(i) - 'A']);

            if (res - tmpMax < k)
                res++;
            else
                counts[s.charAt(i - res) - 'A']--;
        }
        return res;
    }
}