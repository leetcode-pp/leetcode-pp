/* eslint-disable */
export default [
  {
    id: '01',
    name: '01.堆专题',
    link: 'https://lucifer.ren/blog/2021/01/19/heap-2',
    list: [
      {
        title: '代码1.3.1',
        codes: [
          {
            language: 'Python',
            content: `
class MedianFinder:
    def __init__(self):
        self.min_heap = []
        self.max_heap = []
    def addNum(self, num: int) -> None:
        if not self.max_heap or num < -self.max_heap[0]:
            heapq.heappush(self.max_heap, -num)
        else:
            heapq.heappush(self.min_heap, num)
        if len(self.max_heap) > len(self.min_heap) + 1:
            heappush(self.min_heap, -heappop(self.max_heap))
        elif len(self.min_heap) > len(self.max_heap):
            heappush(self.max_heap, -heappop(self.min_heap))
    def findMedian(self) -> float:
        if len(self.min_heap) == len(self.max_heap): return (self.min_heap[0] - self.max_heap[0]) / 2
        return -self.max_heap[0]
`
          },
          {
            language: 'Java',
            content: `
class MedianFinder {
  private Queue<Long> minHeap = new PriorityQueue(),
          maxHeap = new PriorityQueue();

  public void addNum(int num) {
      minHeap.add((long) num);
      maxHeap.add(-minHeap.poll());
      if (minHeap.size() < maxHeap.size())
          minHeap.add(-maxHeap.poll());
  }

  public double findMedian() {
      return minHeap.size() > maxHeap.size()
              ? minHeap.peek()
              : (minHeap.peek() - maxHeap.peek()) / 2.0;
  }
}
`
          }
        ]
      },
      {
        title: '代码1.3.2',
        codes: [
          {
            language: 'Python',
            content: `
class Solution:
    def mincostToHireWorkers(self, quality: List[int], wage: List[int], K: int) -> float:
        eff = [(q / w, q, w) for a, b in zip(quality, wage)]
        eff.sort(key=lambda a: -a[0])
        ans = float('inf')
        for i in range(K-1, len(eff)):
            h = []
            k = K - 1
            rate, _, total = eff[i]
            # 找出工作效率比它高的 k 个人，这 k 个人的工资尽可能低。
            # 由于已经工作效率倒序排了，因此前面的都是比它高的，然后使用堆就可得到 k 个工资最低的。
            for j in range(i):
                heapq.heappush(h, eff[j][1] / rate)
            while k > 0:
                total += heapq.heappop(h)
                k -= 1
            ans = min(ans, total)
        return ans
`
          },
          {
            language: 'Java',
            content: `
public double mincostToHireWorkers(int[] quality, int[] wage, int K) {
  int n = quality.length;
  // 单位薪资
  Pair<Double, Integer>[] pairs = new Pair[n];
  for (int i = 0; i < n; i++) {
      Pair<Double, Integer> pair = new Pair(wage[i] / (quality[i] * 1d), quality[i]);
      pairs[i] = pair;
  }
  Arrays.sort(pairs, (o1, o2) -> o1.getKey() - o2.getKey() > 0 ? 1 : -1);

  double ans = Double.MAX_VALUE;
  // 总工时
  int sumQuilty = 0;
  PriorityQueue<Integer> pq = new PriorityQueue();
  for (int i = 0; i < n; i++) {
      Pair<Double, Integer> p = pairs[i];
      // 这里偷懒直接使用了最小堆 借鉴官方题解，用最大堆也可以的
      pq.offer(-p.getValue());
      sumQuilty += p.getValue();
      if (pq.size() > K)
          // 如果超过k就要把当前工时/工资最高的赶走，这样才符合资本家剥夺剩余价值
          sumQuilty += pq.poll();
      if (pq.size() == K)
          ans = Math.min(ans, sumQuilty * p.getKey());
  }
  return ans;
}
`
          }
        ]
      },
      {
        title: '代码1.3.3',
        codes: [
          {
            language: 'Python',
            content: `
class Solution:
    def mincostToHireWorkers(self, quality: List[int], wage: List[int], K: int) -> float:
        effs = [(q / w, q) for q, w in zip(quality, wage)]
        effs.sort(key=lambda a: -a[0])
        ans = float('inf')
        h = []
        total = 0
        for rate, q in effs:
            heapq.heappush(h, -q)
            total += q
            if len(h) > K:
                total += heapq.heappop(h)
            if len(h) == K:
                ans = min(ans, total / rate)
        return ans
`
          }
        ]
      },
      {
        title: '代码1.3.4',
        codes: [
          {
            language: 'Python',
            content: `
class Solution:
    def kthSmallest(self, mat, k: int) -> int:
        h = []
        cur = (sum(vec[0] for vec in mat), tuple([0] * len(mat)))
        heapq.heappush(h, cur)
        seen = set(cur)

        for _ in range(k):
            acc, pointers = heapq.heappop(h)
            for i, pointer in enumerate(pointers):
                if pointer != len(mat[0]) - 1:
                    t = list(pointers)
                    t[i] = pointer + 1
                    tt = tuple(t)
                    if tt not in seen:
                        seen.add(tt)
                        heapq.heappush(h, (acc + mat[i][pointer + 1] - mat[i][pointer], tt))
        return acc
`
          },
          {
            language: 'Java',
            content: `
public int kthSmallest(int[][] mat, int k) {
  int m = mat.length;
  int n = mat[0].length;
  PriorityQueue<Pair<Integer, int[]>> pq = new PriorityQueue<>((a, b) -> a.getKey() - b.getKey());
  int[] sum = new int[m];
  int total = 0;
  for (int i = 0; i < m; i++) {
      total += mat[i][0];
  }
  Pair<Integer, int[]> pair = new Pair<>(total, sum);
  pq.offer(pair);
  Set<String> seen = new HashSet<>();

  // 小顶堆 执行k次 把前面k小的数组移除 之后栈顶便是我们所求之结果
  while (--k > 0) {
      Pair<Integer, int[]> cur = pq.poll();
      // 行号
      for (int i = 0; i < m; i++) {
          if (cur.getValue()[i] < n - 1) {
              int[] arr = Arrays.copyOf(cur.getValue(), m);
              // 列号
              arr[i]++;
              if (!seen.contains(Arrays.toString(arr))) {
                  seen.add(Arrays.toString(arr));
                  int next = cur.getKey() - mat[i][cur.getValue()[i]] + mat[i][arr[i]];
                  pq.offer(new Pair<>(next, arr));
              }
          }
      }
  }
  return pq.peek().getKey();
}
`
          }
        ]
      },
      {
        title: '代码1.3.5',
        codes: [
          {
            language: 'Python',
            content: `
class Solution:
    def smallestDistancePair(self, nums: List[int], k: int) -> int:
        h = []
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                a, b = nums[i], nums[j]
                # 维持堆大小不超过 k
                if len(h) == k and -abs(a - b) > h[0]:
                    heapq.heappop(h)
                if len(h) < k:
                    heapq.heappush(h, -abs(a - b))

        return -h[0]
`
          }
        ]
      },
      {
        title: '代码1.3.6',
        codes: [
          {
            language: 'Python',
            content: `
class Solution(object):
    def smallestDistancePair(self, nums, k):
        nums.sort()
        # n 种候选答案
        h = [(nums[i+1] - nums[i], i, i+1) for i in range(len(nums) - 1)]
        heapq.heapify(h)

        for _ in range(k):
            diff, fr, to = heapq.heappop(h)
            if to + 1 < len(nums):
                heapq.heappush((nums[to + 1] - nums[fr], fr, to + 1))

        return diff
`
          },
          {
            language: 'Java',
            content: `
public int smallestDistancePair(int[] nums, int k) {
  // 先排序
  Arrays.sort(nums);
  // 小顶堆
  PriorityQueue<Pair<Integer, Integer>> pq = new PriorityQueue<>(Comparator.comparingInt(a -> (nums[a.getValue()] - nums[a.getKey()])));
  // i 于 i+1 可以找到最小的元素
  for (int i = 0; i + 1 < nums.length; i++) {
      Pair pair = new Pair(i, i + 1);
      pq.offer(pair);
  }
  Pair<Integer, Integer> pair = null;
  /**
   * 实现原理：
   * 数组按顺序排序
   * 那么最小的差 以及第二小的差 在第一轮 也就是上面那个 for 里面可以求出来，
   * 由于后续元素是在 原有基础上添加 后续元素肯定是每一轮逐渐增大的，也就是说上一轮集合小于下一轮（同样的起点情况）
   * 证明：原有集合为 i->j  新增集合为  i->j+1 原有集合是新集合的子集，所以新的集合差肯定大于上一轮 ，新的集合同时覆盖（i->j）and (i+1->j+1) 两个集合
   * 这样可以保证即便弹出一个元素 pq 中的堆顶依然是最小元素
   * 如此反复
   * 堆顶元素便是我们所求之元素
   */
  while (k > 0) {
      k--;
      pair = pq.poll();
      if (pair.getValue() + 1 < nums.length) {
          pq.offer(new Pair(pair.getKey(), pair.getValue() + 1));
      }
  }
  return nums[pair.getValue()] - nums[pair.getKey()];
}
`
          }
        ]
      },
      {
        title: '代码1.3.7',
        codes: [
          {
            language: 'Python',
            content: `
class Solution:
    def smallestDistancePair(self, A: List[int], K: int) -> int:
        A.sort()
        l, r = 0, A[-1] - A[0]

        def count_ngt(mid):
            slow = 0
            ans = 0
            for fast in range(len(A)):
                while A[fast] - A[slow] > mid:
                    slow += 1
                ans += fast - slow
            return ans

        while l <= r:
            mid = (l + r) // 2
            if count_ngt(mid) >= K:
                r = mid - 1
            else:
                l = mid + 1
        return l
`
          },
          {
            language: 'Java',
            content: `
public int smallestDistancePair(int[] nums, int k) {
  Arrays.sort(nums);

  int l = 0;
  int r = nums[nums.length - 1] - nums[0];
  while (l < r) {
      int mi = (l + r) / 2;
      int count = 0, left = 0;
      for (int right = 0; right < nums.length; ++right) {
          while (nums[right] - nums[left] > mi) left++;
          count += right - left;
      }
      //count = number of pairs with distance <= mi
      if (count >= k) r = mi;
      else l = mi + 1;
  }
  return r;
}
`
          }
        ]
      },
      {
        title: '代码1.3.8',
        codes: [
          {
            language: 'Python',
            content: `
class Solution:
    def smallestRange(self, martrix: List[List[int]]) -> List[int]:
        l, r = -10**9, 10**9
        # 将每一行最小的都放到堆中，同时记录其所在的行号和列号，一共 n 个齐头并进
        h = [(row[0], i, 0) for i, row in enumerate(martrix)]
        heapq.heapify(h)
        # 维护最大值
        max_v = max(row[0] for row in martrix)

        while True:
            min_v, row, col = heapq.heappop(h)
            # max_v - min_v 是当前的最大最小差值， r - l 为全局的最大最小差值。因为如果当前的更小，我们就更新全局结果
            if max_v - min_v < r - l:
                l, r = min_v, max_v
            if col == len(martrix[row]) - 1: return [l, r]
            # 更新指针，继续往后移动一位
            heapq.heappush(h, (martrix[row][col + 1], row, col + 1))
            max_v = max(max_v, martrix[row][col + 1])
`
          },
          {
            language: 'Java',
            content: `
public int[] smallestRange(List<List<Integer>> nums) {

  int l = -1000000000, r = 1000000000, max = -1000000000;

  // 用一个 int[3] 数组来保存 len， height 以及 val
  PriorityQueue<int[]> pq = new PriorityQueue((Comparator<int[]>) (a, b) -> a[2] - b[2]);

  for (int i = 0; i < nums.size(); i++) {
      pq.offer(new int[]{i, 0, nums.get(i).get(0)});
      max = Math.max(max, nums.get(i).get(0));
  }

  while (!pq.isEmpty()) {
      int[] item = pq.poll();
      int minV = item[2], row = item[0], col = item[1];
      if (max - minV < r - l) {
          l = minV;
          r = max;
      }
      if (col == nums.get(row).size() - 1) {
          return new int[]{l, r};
      }
      int next = nums.get(row).get(col + 1);
      pq.offer(new int[]{row, col + 1, next});
      max = Math.max(next, max);
  }

  return new int[]{l, r};
}
`
          }
        ]
      },
      {
        title: '代码1.3.9',
        codes: [
          {
            language: 'Python',
            content: `
class Solution:
    def smallestRange(self, martrix: List[List[int]]) -> List[int]:
        l, r = -10**9, 10**9
        # 将每一行最小的都放到堆中，同时记录其所在的行号和列号，一共 n 个齐头并进
        h = [(row[0], i, 0) for i, row in enumerate(martrix)]
        heapq.heapify(h)
        # 维护最大值
        max_v = max(row[0] for row in martrix)

        while True:
            min_v, row, col = heapq.heappop(h)
            # max_v - min_v 是当前的最大最小差值， r - l 为全局的最大最小差值。因为如果当前的更小，我们就更新全局结果
            if max_v - min_v < r - l:
                l, r = min_v, max_v
            if col == len(martrix[row]) - 1: return [l, r]
            # 更新指针，继续往后移动一位
            heapq.heappush(h, (martrix[row][col + 1], row, col + 1))
            max_v = max(max_v, martrix[row][col + 1])
    def minimumDeviation(self, nums: List[int]) -> int:
        matrix = [[] for _ in range(len(nums))]
        for i, num in enumerate(nums):
            if num & 1 == 1:
                matrix[i] += [num, num * 2]
            else:
                temp = []
                while num and num & 1 == 0:
                    temp += [num]
                    num //= 2
                temp += [num]
                matrix[i] += temp[::-1]
        a, b = self.smallestRange(matrix)
        return b - a
`
          },
          {
            language: 'Java',
            content: `
public int minimumDeviation(int[] nums) {
  int n = nums.length;
  List<List<Integer>> arr = new ArrayList<>();
  for (int i = 0; i < n; ++i) {
      arr.add(new ArrayList<>());
      if ((nums[i] & 1) == 1) {
          arr.get(i).add(nums[i]);
          arr.get(i).add(nums[i] * 2);
      } else {
          while ((nums[i] & 1) != 0) {
              arr.get(i).add(nums[i]);
              nums[i] >>= 1;
          }
          arr.get(i).add(nums[i]);
          Collections.reverse(arr.get(i));
      }
  }

  int[] res = smallestRange(arr);

  return res[1] - res[0];
}
`
          }
        ]
      },
      {
        title: '代码1.3.10',
        codes: [
          {
            language: 'Python',
            content: `
class Solution:
    def minRefuelStops(self, target: int, startFuel: int, stations: List[List[int]]) -> int:
        stations += [(target, 0)]
        cur = startFuel
        ans = 0

        h = []
        last = 0
        for i, fuel in stations:
            cur -= i - last
            while cur < 0 and h:
                cur -= heapq.heappop(h)
                ans += 1
            if cur < 0:
                return -1
            heappush(h, -fuel)

            last = i
        return ans
`
          },
          {
            language: 'Java',
            content: `
public int minRefuelStops(int target, int startFuel, int[][] stations) {
  if (stations.length == 0) {
      return startFuel >= target ? 0 : -1;
  }

  // 定义次数 ans，车内油量 cur
  int ans = 0, cur = startFuel;
  // 定义 pq 用来在车厢箱保存燃油
  PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> b - a);

  for (int i = 0; i < stations.length; i++) {
      // 车上没油啦 需要到车厢找最大的一桶油来加满
      while (cur < stations[i][0]) {
          Integer fuel = pq.poll();
          // 车厢没油了 mission failed
          if (fuel == null) {
              return -1;
          }
          // 行驶距离
          cur += fuel;
          ans++;
      }
      pq.offer(stations[i][1]);
  }
  // 判断是否到达目的地
  while (cur < target) {
      Integer fuel = pq.poll();
      if (fuel == null) {
          return -1;
      }
      cur += fuel;
      ans++;
  }
  return ans;
}
`
          }
        ]
      },
      {
        title: '代码1.3.11',
        codes: [
          {
            language: 'Python',
            content: `
class Solution:
    def avoidFlood(self, rains: List[int]) -> List[int]:
        ans = [1] * len(rains)
        lakes = collections.defaultdict(int)
        sunny = []

        for i, rain in enumerate(rains):
            if rain > 0:
                ans[i] = -1
                if lakes[rain - 1] == 1:
                    if 0 == len(sunny):
                        return []
                    ans[sunny.pop()] = rain
                lakes[rain - 1] = 1
            else:
                sunny.append(i)
        return ans
`
          },
          {
            language: 'Java',
            content: `
public  int[] avoidFlood(int[] rains) {

    List<Integer>sunnys = new ArrayList<>();

    Map<Integer,Integer> rainings = new HashMap<>();
    int res[] = new int[rains.length];
    for (int i = 0; i < rains.length; i++) {
        // 当前湖泊下雨啦
        if (rains[i]>0){
            if (rainings.containsKey(rains[i])) {
                int lastRainingDay = rainings.get(rains[i]);
                int index =  getLeft(sunnys,lastRainingDay);
                if (index>=sunnys.size()){
                    return new int[]{};
                }

                res[sunnys.get(index)] = rains[i];
                sunnys.remove(index);
            }
            rainings.put(rains[i],i);
            res[i] = -1;
        }else {
            sunnys.add(i);
        }
    }
    for (int i = 0; i <sunnys.size(); i++) {
        res[sunnys.get(i)] = 1;
    }
    return res;
}
public int getLeft(List<Integer> arr,int key){
    int left = 0;
    int right = arr.size();
    while (left<right){
        int mid = (left+right)>>1;

        if (arr.get(mid)>=key){
            right=mid;
        }else {
            left = mid+1;
        }
    }
    return left;
}
`
          }
        ]
      },
      {
        title: '代码1.3.12',
        codes: [
          {
            language: 'Python',
            content: `
class Solution:
    def furthestBuilding(self, heights: List[int], bricks: int, ladders: int) -> int:
        h = []
        for i in range(1, len(heights)):
            diff = heights[i] - heights[i - 1]
            if diff <= 0:
                continue
            if bricks < diff and ladders > 0:
                ladders -= 1
                if h and -h[0] > diff:
                    bricks -= heapq.heappop(h)
                else:
                    continue
            bricks -= diff
            if bricks < 0:
                return i - 1
            heapq.heappush(h, -diff)
        return len(heights) - 1
`
          },
          {
            language: 'Java',
            content: `
public int furthestBuilding(int[] heights, int bricks, int ladders) {
  if (heights.length < 1) {
      return heights.length;
  }
  int needBrick = 0;

  PriorityQueue<Integer> pq = new PriorityQueue();
  for (int i = 1; i < heights.length; i++) {
      int diff = heights[i] - heights[i - 1];
      if (diff > 0) {
          pq.offer(diff);
          if (pq.size() > ladders) {
              int brick = pq.poll();
              needBrick += brick;
          }
          if (needBrick > bricks) {
              return i - 1;
          }
      }
  }
  return heights.length - 1;
}
`
          }
        ]
      },
      {
        title: '代码1.4.1',
        codes: [
          {
            language: 'Python',
            content: `
def dijkstra(graph, start, end):
    # 堆里的数据都是 (cost, i) 的二元祖，其含义是“从 start 走到 i 的距离是 cost”。
    heap = [(0, start)]
    visited = set()
    while heap:
        (cost, u) = heapq.heappop(heap)
        if u in visited:
            continue
        visited.add(u)
        if u == end:
            return cost
        for v, c in graph[u]:
            if v in visited:
                continue
            next = cost + c
            heapq.heappush(heap, (next, v))
    return -1
`
          },
          {
            language: 'Java',
            content: `
            
            `
          }
        ]
      },
      {
        title: '代码1.4.2',
        codes: [
          {
            language: 'Python',
            content: `
class Solution:
    def dijkstra(self, graph, start, end):
        heap = [(0, start)]
        visited = set()
        while heap:
            (cost, u) = heapq.heappop(heap)
            if u in visited:
                continue
            visited.add(u)
            if u == end:
                return cost
            for v, c in graph[u]:
                if v in visited:
                    continue
                next = cost + c
                heapq.heappush(heap, (next, v))
        return -1
    def networkDelayTime(self, times: List[List[int]], N: int, K: int) -> int:
        graph = collections.defaultdict(list)
        for fr, to, w in times:
            graph[fr - 1].append((to - 1, w))
        ans = -1
        for to in range(N):
            # 调用封装好的 dijkstra 方法
            dist = self.dijkstra(graph, K - 1, to)
            if dist == -1: return -1
            ans = max(ans, dist)
        return ans
`
          },
          {
            language: 'Java',
            content: `
PriorityQueue<Node> pq;
public int networkDelayTime(int[][] times, int n, int k) {
    // 用邻接表构建图
    List<int[]>[] graph = new List[n + 1];
    for (int i = 0; i < graph.length; i++) {
        graph[i] = new ArrayList();
    }
    for (int i = 0; i < times.length; i++) {
        int[] edge = times[i];
        graph[edge[0]].add(edge);
    }

    int dist,ans = -1;

    for (int to = 1; to <= n; to++) {
        dist = dijkstra(graph, k, to);
        if (dist == -1) {
            return -1;
        }
        ans = Math.max(ans, dist);
    }
    return ans;
}

public int dijkstra(List<int[]>[] graph, int start, int end) {
    Arrays.fill(cost, Integer.MAX_VALUE);
    boolean visited[] = new boolean[graph.length];
    cost[start] = 0;
    pq = new PriorityQueue();
    pq.offer(new Node(start, 0));

    while (!pq.isEmpty()) {
        //每次取出距离最近的节点
        Node node = pq.poll();
        if (visited[node.v]) {
            continue;
        }
        visited[node.v] = true;
        if (node.v == end) {
            return node.cost;
        }

        for (int[] edge : graph[node.v]) {
            int c = edge[2];
            // 如果原点经过该条边到达目标节点 花销少于之前的到目标节点花销，那么更新
            if (visited[edge[1]]) {
                continue;
            }
            int next = c + node.cost;
            // 把目标节点加入
            pq.offer(new Node(edge[1], next));

        }
    }

    return -1;
}
`
          }
        ]
      },
      {
        title: '代码1.4.3',
        codes: [
          {
            language: 'Python',
            content: `
class Solution:
    def dijkstra(self, graph, start, end):
        heap = [(0, start)]  # cost from start node,end node
        dist = {}
        while heap:
            (cost, u) = heapq.heappop(heap)
            if u in dist:
                continue
            dist[u] = cost
            for v, c in graph[u]:
                if v in dist:
                    continue
                next = cost + c
                heapq.heappush(heap, (next, v))
        return dist
    def networkDelayTime(self, times: List[List[int]], N: int, K: int) -> int:
        graph = collections.defaultdict(list)
        for fr, to, w in times:
            graph[fr - 1].append((to - 1, w))
        ans = -1
        dist = self.dijkstra(graph, K - 1, to)
        return -1 if len(dist) != N else max(dist.values())
`
          },
          {
            language: 'Java',
            content: `
            int dist[];
PriorityQueue<Node> pq;

public int networkDelayTime(int[][] times, int n, int k) {
    // 用邻接表构建图
    List<int[]>[] graph = new List[n + 1];
    for (int i = 0; i < graph.length; i++) {
        graph[i] = new ArrayList();
    }
    for (int i = 0; i < times.length; i++) {
        int[] edge = times[i];
        graph[edge[0]].add(edge);
    }
    return dijkstra(graph, k);

}


public int[] dijkstra(List<int[]>[] graph, int start) {
    dist = new int[graph.length];
    Arrays.fill(dist, Integer.MAX_VALUE);
    boolean visited[] = new boolean[graph.length];
    dist[start] = 0;
    pq = new PriorityQueue();
    pq.offer(new Node(start, 0));

    while (!pq.isEmpty()) {
        //每次取出距离最近的节点
        Node node = pq.poll();
        if (visited[node.v]) {
            continue;
        }
        visited[node.v] = true;
        for (int[] edge : graph[node.v]) {
            int c = edge[2];
            // 如果原点经过该条边到达目标节点 花销少于之前的到目标节点花销，那么更新
            if (visited[edge[1]]) {
                continue;
            }
            int next = c + node.cost;
            // 把目标节点加入
            pq.offer(new Node(edge[1], next));

        }
    }

    return dist;
}

class Node implements Comparable<Node> {
    int v;
    int cost;

    public Node(int v, int cost) {
        this.v = v;
        this.cost = cost;
    }

    @Override
    public int compareTo(Node o) {
        return this.cost - o.cost;
    }
}
`
          }
        ]
      },
      {
        title: '代码1.4.4',
        codes: [
          {
            language: 'Python',
            content: `
class Solution:
    # 改造一下，增加参数 K，堆多携带一个 steps 即可
    def dijkstra(self, graph, start, end, K):
        heap = [(0, start, 0)]
        visited = set()
        while heap:
            (cost, u, steps) = heapq.heappop(heap)
            if u in visited:
                continue
            visited.add((u, steps))
            if steps > K: continue
            if u == end:
                return cost
            for v, c in graph[u]:
                if (v, steps) in visited:
                    continue
                next = cost + c
                heapq.heappush(heap, (next, v, steps + 1))
        return -1
    def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, K: int) -> int:
        graph = collections.defaultdict(list)
        for fr, to, price in flights:
            graph[fr].append((to, price))
            # 调用封装好的 dijkstra 方法
        return self.dijkstra(graph, src, dst, K + 1)
`
          },
          {
            language: 'Java',
            content: `
PriorityQueue<Node> pq;
int k;
public int findCheapestPrice(int n, int[][] flights, int src, int dst, int K) {
    k = K + 1;
    // 用邻接表构建图
    List<int[]>[] graph = new List[n];
    for (int i = 0; i < graph.length; i++) {
        graph[i] = new ArrayList();
    }
    for (int i = 0; i < flights.length; i++) {
        int[] edge = flights[i];
        graph[edge[0]].add(edge);
    }
    return dijkstra(graph, src, dst);
}


public int dijkstra(List<int[]>[] graph, int start, int dst) {
    int[] dist = new int[graph.length];
    Arrays.fill(dist, Integer.MAX_VALUE);
    Set visited = new HashSet();
    pq = new PriorityQueue();
    pq.offer(new Node(start, 0, +1));
    while (!pq.isEmpty()) {
        //每次取出距离最近的节点
        Node node = pq.poll();
        if (visited.contains(node)) {
            continue;
        }
        visited.add(node);
        if (node.step > k + 1) continue;
        if (node.v == dst)
            return node.cost;

        for (int[] edge : graph[node.v]) {
            int money = edge[2];
            dist[edge[1]] = money + node.cost;
            Node nextNode = new Node(edge[1], dist[edge[1]], node.step + 1);
            if(visited.contains(nextNode)){
                continue;
            }
                // 把目标节点加入
            pq.offer(nextNode);
        }
    }
    return -1;
}


class Node implements Comparable<Node> {
    int v;
    int cost;
    int step;

    public Node(int v, int cost, int step) {
        this.v = v;
        this.cost = cost;
        this.step = step;
    }
    @Override
    public int compareTo(Node o) {
        return this.cost - o.cost;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Node){
            return ((Node) obj).step==this.step&&((Node) obj).v==this.v;
        }
        return super.equals(obj);
    }
}
`
          }
        ]
      }
    ]
  }
]
