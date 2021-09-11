//TLE
class Solution {
public:
    bool canWinNim(int n) {
	bool res = false;
        bool *mem = (bool *)malloc((n + 1) * sizeof(bool));
        memset(mem, true, (n + 1) * sizeof(bool));
        
        for (int i = 4; i < n + 1; i++) {
            if (!(mem[i - 1] && mem[i - 2] && mem[i - 3]))
                mem[i] = true;
            else
                mem[i] = false;
        }
        
	res = mem[n];
	free(mem);
        return res;
    }
};
