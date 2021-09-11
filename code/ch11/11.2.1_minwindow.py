class Solution:
    def minWindow(self, s:str, t:str)->str:
        if not t or not s:
            return ""
            
        dict_t = Counter(t)
        
        required = len(dict_t)
        
        #初始化滑动窗口
        left, right = 0, 0
        
        formed = 0
        
        window_counts = {}
        
        ans = float("inf"), None, None
        
        while right < len(s):
            character = s[right]
            window_counts[character] = window_counts.get(character, 0) + 1
            
            if character in dict_t and window_counts[character] == dict_t[character]:
                formed += 1
                
            while left <= right and formed == required:
                character = s[left]
                
                if right - left + 1 < ans[0]:
                    ans = (right - left + 1, left, right)
                    
                window_counts[character] -= 1
                if character in dict_t and window_counts[character] < dict_t[character]:
                    formed -= 1
                    
                left += 1
            right += 1
                
        if ans[0] == float("inf"):
            return ""
        else:
            return s[ans[1]: ans[2] + 1]
