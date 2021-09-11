class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if (s1.length() > s2.length())
            return false;
        int[] arrayS1 = new int[26], arrayS2 = new int[26];
        int count = 0;

        for (int i = 0; i < s1.length(); i++) {
            arrayS1[s1.charAt(i) - 'a']++;
            arrayS2[s2.charAt(i) - 'a']++;
        }

        for (int i = 0; i < 26; i++) {
            if (arrayS1[i] == arrayS2[i])
                count++;
        }

        for (int i = 0; i < s2.length() - s1.length(); i++) {
            if (count == 26)
                return true;
            int left = s2.charAt(i) - 'a', right = s2.charAt(i + s1.length()) - 'a';

            arrayS2[right]++;
            if (arrayS2[right] == arrayS1[right])
                count++;
            else if (arrayS2[right] == arrayS1[right] + 1)
                count--;

            arrayS2[left]--;
            if (arrayS2[left] == arrayS1[left])
                count++;
            else if (arrayS2[left] == arrayS1[left] - 1)
                count--;
        }

        return count == 26;
    }
}