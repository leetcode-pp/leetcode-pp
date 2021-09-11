public int countPrimes(int n) {
    if (n <= 1) {
        return 0;
    }
    boolean[] tmp = new boolean[n];
    Arrays.fill(tmp, true);
    int ans = 0;
    tmp[0] = false;
    tmp[1] = false;
    for (int i = 2; i < n; i++) {
        if (!tmp[i]) {
            continue;
        }
        // 查找 i 倍数的优化细节：i * i开始
        for (int j = i * i; j < n; j += i) {
            tmp[j] = false;
        }
    }
    for (int i = 0; i < n; i++) {
        if (tmp[i]) {
            ans += 1;
        }
    }
    return ans;
}