class Solution {
public:
    string countAndSay(int n) {
        if (n == 1) return "1";
        
        string pre_str = countAndSay(n - 1);
        
        int char_index = 0, char_count = 1;
        string cur_str = "";
        
        for (int i = 0; i < pre_str.length() - 1; i++) {
            if (pre_str[char_index] == pre_str[i + 1])
                char_count += 1;
            else {
                cur_str += to_string(char_count) + pre_str[char_index];
                char_index = i + 1;
                char_count = 1;
            }
        }
        
        cur_str += to_string(char_count) + pre_str[char_index];
        
        return cur_str;
    }
};
