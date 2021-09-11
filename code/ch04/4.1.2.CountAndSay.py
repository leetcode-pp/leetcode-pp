class Solution:
    def countAndSay(self, n: int) -> str:
        if n == 1:
            return "1"
        else:
            previous_string = self.countAndSay(n - 1)
            char_index, char_count = 0, 1
            current_string = ""
            for i in range(len(previous_string)):
                if (
                    i + 1 < len(previous_string)
                    and previous_string[char_index] == previous_string[i + 1]
                ):
                    char_count += 1
                else:
                    current_string += str(char_count) + previous_string[char_index]
                    char_index, char_count = i + 1, 1

            return current_string
