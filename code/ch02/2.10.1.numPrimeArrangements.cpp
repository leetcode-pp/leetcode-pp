typedef long long ll;

const ll magic = 1000000007LL;

class Solution {
public:
  ll factorial(ll n) {
    return (n <= 1LL) ? 1LL : n % magic * (factorial(n - 1) % magic) % magic;
  }
  ll numPrimeArrangements(ll n) {
    ll primes[] = {
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
            101,
    };
    int primeCount = 0;
    while (primes[primeCount] <= n)
      primeCount += 1;
    return factorial(primeCount) % magic * \
      (factorial(n - primeCount) % magic) % magic;
  }
};
