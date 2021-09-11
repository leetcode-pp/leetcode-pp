class Solution {
public:
    string countAndSay(int n) {
        string res = "1";
        
        for (int i = 1; i < n; i++) {
            string tmp = "";
            char current_char = res[0];
            int  char_count   = 0;
            
            for (int j = 0; j < res.size(); j++) {
                if (res[j] != current_char) {
                    tmp += itoa(char_count) + current_char;
                    current_char = res[j];
                    char_count = 1;
                } else {
                    char_count += 1;
                }
            }
            
            tmp += itoa(char_count) + current_char;
            res = tmp;
        }
        
        return res;
    }
};
