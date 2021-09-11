import java.util.*;

public class Solution {
  public int fourSumCount(int[] A,
      int[] B, int[] C, int[] D) {
    Map<Integer, Integer> mapper = new HashMap<Integer, Integer>();
    int res = 0;
    for (int i = 0; i < A.length; i++)
      for (int j = 0; j < B.length; j++) {
        if (mapper.get(A[i] + B[j]) != null)
          mapper.put(A[i] + B[j], mapper.get(A[i] + B[j]) + 1);
        else
          mapper.put(A[i] + B[j], 1);
      }
    for (int i = 0; i < C.length; i++)
      for (int j = 0; j < D.length; j++)
        if (mapper.get(-1 * (C[i] + D[j])) != null)
          res += mapper.get(-1 * (C[i] + D[j]));
    return res;
  }
}
