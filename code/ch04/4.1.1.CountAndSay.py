class Solution:
    def countAndSay(self, n: int) -> str:
        ans = "1"
        for i in range(1, n):
            tmp = ""
            current_char, char_count = ans[0], 0
            for j in range(len(ans)):
                if ans[j] != current_char:
                    tmp += str(char_count) + current_char
                    current_char, char_count = ans[j], 1
                else:
                    char_count += 1
            tmp += str(char_count) + current_char
            ans = tmp
        return ans

