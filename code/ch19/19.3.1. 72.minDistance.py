class Solution:
    def helper(
        self, word1: str, s1: int, e1: int, word2: str, s2: int, e2: int, memo: dict
    ) -> int:
        if s1 > e1:
            return e2 - s2 + 1
        elif s2 > e2:
            return e1 - s1 + 1
        c1 = word1[s1]
        c2 = word2[s2]
        key = (s1, s2)
        if key in memo:
            return memo[key]
        if c1 == c2:
            memo[key] = self.helper(word1, s1 + 1, e1, word2, s2 + 1, e2, memo)
            return memo[key]
        else:
            memo[key] = (
                min(
                    self.helper(
                        word1, s1 + 1, e1, word2, s2, e2, memo
                    ),  # delete or add
                    self.helper(
                        word1, s1, e1, word2, s2 + 1, e2, memo
                    ),  # delete or add
                    self.helper(word1, s1 + 1, e1, word2, s2 + 1, e2, memo),  # replace
                )
                + 1
            )

            return memo[key]

    def minDistance(self, word1: str, word2: str) -> int:
        return self.helper(word1, 0, len(word1) - 1, word2, 0, len(word2) - 1, dict())
