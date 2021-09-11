import java.util.*;

public class Solution {
    Map<String, String> mapper = new HashMap<String, String>();
    int m;
    int n;
    private void flip(String[] state, int i) {
        state[i] = mapper.get(state[i]);
        if ((i % n) != 0) {
            state[i - 1] = mapper.get(state[i - 1]);
        }
        if ((i % n) < n - 1) {
            state[i + 1] = mapper.get(state[i + 1]);
        }
        if (i >= n) {
            state[i - n] = mapper.get(state[i - n]);
        }
        if (i < (m - 1) * n) {
            state[i + n] = mapper.get(state[i + n]);
        }
    }
    public int minFlips(int[][] mat) {
        m = mat.length;
        n = mat[0].length;
        int[][] initial = new int[m][n];
        StringBuffer targetBuffer = new StringBuffer();
        StringBuffer curBufffer = new StringBuffer();
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                targetBuffer.append(String.valueOf(initial[i][j]));
                curBufffer.append(String.valueOf(mat[i][j]));
            }
        }
        String target = targetBuffer.toString();
        String cur = curBufffer.toString();
        LinkedList<String> queue = new LinkedList<String>();
        queue.offer(cur);
		Set visited = new HashSet();
        int steps = 0;
        mapper.put("0", "1");
        mapper.put("1", "0");
        while (!queue.isEmpty()) {
            int size = queue.size();
            for(int i = 0; i < size; i++) {
                cur = queue.poll();
                if (cur.equals(target)) return steps;
                if (visited.contains(cur)) continue;
                visited.add(cur);
                
                for(int j = 0; j < cur.length(); j++) {
                    String[] s = cur.split("");
                    flip(s, j);
                    queue.add(String.join("", s));
                }
            }
            steps += 1;
        }
        return -1;
    }
}
