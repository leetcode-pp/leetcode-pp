def GCD(a: int, b: int) -> int:
    return a if b == 0 else GCD(b, a % b)
