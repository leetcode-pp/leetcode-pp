class Solution {
public:
    bool canWinNim(int n) {
        if (n < 4) return true;
        
        int a = true, b = true, c = true;
        
        for (int i = 4; i < n + 1; i++) {
            int current = !(a && b && c);
            a = b;
            b = c;
            c = current;
        }
        
        return c;
    }
};
