public class Solution {
  public final long magic = (long)1000000007;
  public long factorial(long n) {
    return (n <= 1) ? 1 : n % magic * (factorial(n - 1) % magic) % magic;
  }
  public int numPrimeArrangements(int n) {
    int[] primes = {
            2,
            3,
            5,
            7,
            11,
            13,
            17,
            19,
            23,
            29,
            31,
            37,
            41,
            43,
            47,
            53,
            59,
            61,
            67,
            71,
            73,
            79,
            83,
            89,
            97,
            101
    };
    int primeCount = 0;
    while (primes[primeCount] <= n)
      primeCount += 1;
    return (int)(factorial((long)primeCount) % magic *
      (factorial((long)n - (long)primeCount) % magic) % magic);
  }
}
