class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        if (len(s1) > len(s2)):
            return False
        
        list1 = [0 for i in range(26)]
        list2 = [0 for i in range(26)]
        
        for i in range(len(s1)):
            list1[ord(s1[i]) - ord('a')] += 1
            list2[ord(s2[i]) - ord('a')] += 1
            
        count = 0
        for i in range(26):
            if list1[i] == list2[i]:
                count += 1
                
        for i in range(len(s2) - len(s1)):
            right = ord(s2[i + len(s1)]) - ord('a')
            left = ord(s2[i]) - ord('a')
            if count == 26:
                return True
            
            list2[right] += 1
            if list2[right] == list1[right]:
                count += 1
            elif list2[right] == list1[right] + 1:
                count -= 1
                
            list2[left] -= 1
            if list2[left] == list1[left]:
                count += 1
            elif list2[left] == list1[left] - 1:
                count -= 1
                
        return count == 26
