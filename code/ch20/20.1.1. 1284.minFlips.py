class Solution:
    def minFlips(self, mat: List[List[int]]) -> int:
        # 放到 flip 函数外面可以减少计算
        mapper = {"0": "1", "1": "0"}

        def flip(state: List[str], i: int) -> None:
            state[i] = mapper[state[i]]
            if i % n != 0:
                state[i - 1] = mapper[state[i - 1]]
            if i % n < n - 1:
                state[i + 1] = mapper[state[i + 1]]
            if i >= n:
                state[i - n] = mapper[state[i - n]]
            if i < (m - 1) * n:
                state[i + n] = mapper[state[i + n]]

        m = len(mat)
        n = len(mat[0])
        target = "0" * (m * n)
        cur = "".join(str(cell) for row in mat for cell in row)

        queue = [cur]
        visited = set()
        steps = 0

        while len(queue) > 0:
            for _ in range(len(queue)):
                cur = queue.pop(0)
                if cur == target:
                    return steps
                if cur in visited:
                    continue

                visited.add(cur)
                for i in range(len(cur)):
                    s = list(cur)
                    flip(s, i)
                    queue.append("".join(s))
            steps += 1

        return -1
