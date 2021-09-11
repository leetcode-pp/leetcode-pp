class Solution {
public:
    int integerReplacement(int n) {
        long int tmp_num = n;
        int count = 0;
        
        while (tmp_num > 1) {
            if (tmp_num % 2 == 0)
                tmp_num >>= 1;
            else if (((tmp_num + 1) % 4 == 0) && (tmp_num != 3))
                tmp_num += 1;
            else
                tmp_num -= 1;
            
            count += 1;
        }
        
        return count;
    }
};
