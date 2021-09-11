class Solution:
    def singleNumber(self, nums:List[int])->int:
        hash_tab = defaultdict(int)
        
        for i in nums:
            hash_tab[i] += 1
            
        for i in hash_tab:
            if hash_tab[i] == 1:
                return i
