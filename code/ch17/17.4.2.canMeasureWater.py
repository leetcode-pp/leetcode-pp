class Solution:
    def canMeasureWater(self, x: int, y: int, z: int) -> bool:
        if x + y < z:
            return False

        if z == 0:
            return True

        if x == 0:
            return y == z

        if y == 0:
            return x == z

        def GCD(a: int, b: int) -> int:
            smaller = min(a, b)
            while smaller:
                if a % smaller == 0 and b % smaller == 0:
                    return smaller
                smaller -= 1

        return z % GCD(x, y) == 0
