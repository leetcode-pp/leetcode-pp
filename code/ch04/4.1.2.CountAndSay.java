public class CountAndSay {
    public String countAndSay(int n) {
        String ans = "1";
        for (int i = 1; i < n; i++) {
            String tmp = "";
            char currentChar = ans.charAt(0);
            int charCount = 0;

            for (int j = 0; j < ans.length(); j++) {
                if (ans.charAt(j) != currentChar) {
                    tmp += (charCount + "" + currentChar);
                    currentChar = ans.charAt(j);
                    charCount = 1;
                } else {
                    charCount++;
                }
            }
            tmp += (charCount + "" + currentChar);
            ans = tmp;
        }
        return ans;
    }
}