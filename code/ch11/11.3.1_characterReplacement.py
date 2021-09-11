class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        res = low = high = 0
        counts = collections.Counter()
        
        for high in range(1, len(s) + 1):
            counts[s[high - 1]] += 1
            max_char_n = counts.most_common(1)[0][1]
            
            if high - low - max_char_n > k:
                counts[s[low]] -= 1
                low += 1
        
        return high -low
