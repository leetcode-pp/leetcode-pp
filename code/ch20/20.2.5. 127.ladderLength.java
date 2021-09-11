import java.util.*;

class Solution {
  public int ladderLength(String beginWord, String endWord,
      List<String> wordList) {
    Queue<String> q = new LinkedList<String>();
    q.add(beginWord);
    Set<String> visited = new HashSet<String>();
    int steps = 1, n = wordList.size(),
        L = beginWord.length();
    Map<String, List<String> > wizards =
      new HashMap<String, List<String> >();
    for (int i = 0; i < n; i++) {
      String word = wordList.get(i);
      for (int j = 0; j < L; j++) {
        String key = word.substring(0, j) + "*"
          + word.substring(j + 1, word.length());
        if (wizards.get(key) == null) {
          List<String> magic = new ArrayList<>();
          wizards.put(key, magic);
        }
        List<String> magic = wizards.get(key);
        magic.add(word);
        wizards.put(key, magic);
      }
    }
    while (q.size() != 0) {
      int last_q_size = q.size();
      for (int flg = 0; flg < last_q_size; flg++) {
        String cur = q.poll();
        if (visited.contains(cur)) continue;
        visited.add(cur);
        if (cur.equals(endWord)) return steps;
        for (int i = 0; i < L; i++) {
          String key = cur.substring(0, i) + "*"
            + cur.substring(i + 1, cur.length());
          if (wizards.get(key) == null) continue;
          for (int j = 0; j < wizards.get(key).size(); j++)
            q.add(wizards.get(key).get(j));
        }
      }
      steps += 1;
    }
    return 0;
  }
}
