def isPalindrome(s: str, n: int) -> bool:
    l = 0
    r = n - 1
    while l < r:
        if s[l] != s[r]:
            return False
        l += 1
        r -= 1

    return True
