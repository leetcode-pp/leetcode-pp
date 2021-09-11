class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        t_map = [0] * 26
        for t in tasks:
            t_map[ord(t) - ord("A")] += 1
        t_map.sort()
        # max_num 为最高次数，cnt 为最高次数的任务种类
        max_num, cnt = t_map[25], 0
        for i in range(26):
            if t_map[i] == max_num:
                cnt += 1
        return max((max_num - 1) * (n + 1) + cnt, len(tasks))
