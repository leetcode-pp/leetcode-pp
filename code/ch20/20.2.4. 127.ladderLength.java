import java.util.*;

class Solution {
  public int ladderLength(String beginWord,
      String endWord, List<String> wordList) {
    Queue<String> q = new LinkedList<String>();
    q.offer(beginWord);
    Set<String> visited = new HashSet<String>();
    int steps = 1, L = beginWord.length();
    while (q.size() != 0) {
      int last_q_size = q.size();
      for (int flg = 0; flg < last_q_size; flg++) {
        String cur = q.poll();
        if (visited.contains(cur)) continue;
        visited.add(cur);
        if (cur.equals(endWord)) return steps;
        for (int i = 0; i < L; i++)
          for (int j = 0; j < 26; j++) {
            String s = "";
            for (int ww = 0; ww < i; ww++)
              s = s + String.valueOf(cur.charAt(ww));
            s = s + String.valueOf((char)('a' + j));
            for (int ww = i + 1; ww < cur.length(); ww++)
              s = s + String.valueOf(cur.charAt(ww));
            for (int k = 0; k < wordList.size(); k++)
              if (wordList.get(k).equals(s)) {
                q.add(s);
              }
          }
      }
      steps += 1;
    }
    return 0;
  }
}
