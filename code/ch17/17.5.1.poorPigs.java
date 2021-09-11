import java.lang.Math;

public class Solution {
  public int poorPigs(int buckets, int minutesToDie,
      int minutesToTest) {
    int cnt = 0;
    while (Math.pow(minutesToTest / minutesToDie + 1, cnt)
        < buckets)
      cnt += 1;
    return cnt;
  }
}
