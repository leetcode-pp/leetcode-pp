public class CountAndSay {
    public String countAndSay(int n) {
        String ans = "1";
        for (int i = 1; i < n; i++) {
            StringBuffer stringBuffer = new StringBuffer();
            char currentChar = ans.charAt(0);
            int charCount = 0;

            for (int j = 0; j < ans.length(); j++) {
                if (ans.charAt(j) != currentChar) {
                    stringBuffer.append(charCount);
                    stringBuffer.append(currentChar);
                    currentChar = ans.charAt(j);
                    charCount = 1;
                } else {
                    charCount++;
                }
            }
            stringBuffer.append(charCount);
            stringBuffer.append(currentChar);
            ans = stringBuffer.toString();
        }
        return ans;
    }
}