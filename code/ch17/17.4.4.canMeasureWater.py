def GCD(a: int, b: int) -> int:
    if a == b:
        return a
    if a < b:
        return GCD(b - a, a)
    return GCD(a - b, b)
