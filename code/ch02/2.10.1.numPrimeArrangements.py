class Solution:
    def numPrimeArrangements(self, n: int) -> int:
        def factorial(n) -> int:
            if n <= 1:
                return 1
            return n * factorial(n - 1)

        primes = [
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
        ]

        primeCount = 0
        while primes[primeCount] <= n:
            primeCount += 1
        return factorial(primeCount) * factorial(n - primeCount) % (10 ** 9 + 7)
