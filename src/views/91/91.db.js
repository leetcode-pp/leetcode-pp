module.exports = {
  timeRange: {
    basic: ['2025/7/15', '2025/8/19'],
    topic: ['2025/8/20', '2025/9/24'],
    advanced: ['2025/9/25', '2025/10/13']
  },
  homeworks: {
    pre: [
      {
        title: '预习篇作业一：《如何衡量算法的性能》',
        desc: `
        给定代码，分析时间复杂度是学习算法最核心的技能之一，务必掌握。

        请分析下面代码的时间空间复杂度，并解释原因。

        下面的代码打印了所有从 0 到 n 的斐波那契数列。时间复杂度是多少？
        void allFib(int n) {
          for (int i = 0; i < n; i++) {
            System.out.println(i + ": " + fib(i));
          }
        }
        
        int fib(int n) {
          if (n <= 0) return 0;
          else if (n == 1) return 1;
            return fib(n - 1) + fib(n - 2);
        }
        `,
        lectureUrl: '/solutionDetail?type=2&id=1002&max_id=1005',
        issueUrl: 'https://github.com/leetcode-pp/homework/issues/12'
      }
    ],
    basic: [
      {
        title: '基础篇作业一：《图论》',
        desc: `
        图的一个很重要的问题是求最短路，这在实际应用中也非常有用。但是如果要求次短路（即除了最短路的第二短的路径）呢？力扣有一道类似的题目，大家可以作为参考 [2045. 到达目的地的第二短时间](https://leetcode.cn/problems/second-minimum-time-to-reach-destination/)
                  。
        `,
        lectureUrl: '/solutionDetail?type=2&id=2006&max_id=2008',
        issueUrl: 'https://github.com/leetcode-pp/homework/issues/2'
      },
      {
        title: '基础篇作业 2.1：《模拟，枚举与递推》',
        desc: `
         求 1 到 n 中所有整数 x 的 f(x) ，并以数组返回。其中
                  f(x) 指的是 x 的 2 的因子个数。 比如 f(6) = 1 ，因为 6 = 2 *
                  3，只有一个因子 2 。 f(4) = 2 ，因为 4 = 2 * 2，有两个因子 2
                  。
        `,
        lectureUrl: '/solutionDetail?type=2&id=2007&max_id=2008',
        issueUrl: 'https://github.com/leetcode-pp/homework/issues/1'
      },
      {
        title: '基础篇作业 2.2 ：《模拟，枚举与递推》',
        desc: `
编写一种方法，将字符串中的空格全部替换为 %20。假定该字符串尾部有足够
的空间存放新增字符，并且知道字符串的“真实”长度。

示例：
输入："Mr John Smith ", 13
输出："Mr%20John%20Smith"
        `,
        lectureUrl: '/solutionDetail?type=2&id=2007&max_id=2008',
        issueUrl: 'https://github.com/leetcode-pp/homework/issues/13'
      }
    ],
    topic: [
      {
        title: '专题篇：《二分查找》',
        desc: `
参考 2258. 逃离火灾(https://leetcode-cn.com/problems/escape-the-spreading-fire/)
        `,
        lectureUrl: '/solutionDetail?type=2&id=3001&max_id=3008',
        issueUrl: 'https://github.com/leetcode-pp/homework/issues/3'
      },
      {
        title: '专题篇：《滑动窗口》',
        desc: `
        假设我们要求窗口大小为 k 情况下的窗口元素和最大为多少。为了增加难度，再增加一个条件：窗口内不能有重复元素。

        函数签名如下：
        
        \`\`\`py
        class Solution:
            def solve(self, nums: List[int], k: int) -> int:
                pass
        \`\`\`
        
        代码中 k 为窗口大小，nums 为原数组。
        `,
        lectureUrl: '/solutionDetail?type=2&id=3002&max_id=3008',
        issueUrl: 'https://github.com/leetcode-pp/homework/issues/10'
      },
      {
        title: '专题篇：《搜索》',
        desc: `
        参考 最便宜的公交路线(https://binarysearch.com/problems/Cheapest-Bus-Route)
                `,
        lectureUrl: '/solutionDetail?type=2&id=3003&max_id=3008',
        issueUrl: 'https://github.com/leetcode-pp/homework/issues/4'
      },
      {
        title: '专题篇：《动态规划》',
        desc: `
        参考 [1770. 执行乘法运算的最大分数](https://leetcode.cn/problems/maximum-score-from-performing-multiplication-operations/)
                `,
        lectureUrl: '/solutionDetail?type=2&id=3004&max_id=3008',
        issueUrl: 'https://github.com/leetcode-pp/homework/issues/6'
      },
      {
        title: '专题篇：《分治》',
        desc: `
        参考 [4. 寻找两个正序数组的中位数](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)
                `,
        lectureUrl: '/solutionDetail?type=2&id=3006&max_id=3008',
        issueUrl: 'https://github.com/leetcode-pp/homework/issues/5'
      },
      {
        title: '专题篇作业：《贪心》',
        desc: `
        [621. 任务调度器](https://leetcode-cn.com/problems/task-scheduler)`,
        lectureUrl: '/solutionDetail?type=2&id=3007&max_id=3008',
        issueUrl: 'https://github.com/leetcode-pp/homework/issues/8',
        answer: `
        class Solution:
          def leastInterval(self, tasks: List[str], n: int) -> int:
              counter = collections.Counter(tasks)
              max_count = max(counter.values())
              cnt = 0
              for k in counter:
                  if counter[k] == max_count:
                      cnt += 1

              return max((max_count - 1) * (n + 1) + cnt, len(tasks))
        `
      },
      {
        title: '专题篇作业：《位运算》',
        desc: `
        如何求解一个数字 n 的 x 进制表示是多少? 比如数字 4 的二进制表示为 10，就返回字符串 "10"。`,
        lectureUrl: '/solutionDetail?type=2&id=3008&max_id=3008',
        issueUrl: 'https://github.com/leetcode-pp/homework/issues/8',
        answer: `
        s = ""
        while n:
            s = s + str(n % x) # 取 x 进制的最后一位
            n = n // x # x 进制下，移动一位
        `
      }
    ],
    //
    advanced: [
      {
        title: '进阶篇作业：《Trie》',
        desc: `
        本节的作业是第 311 场周赛的 T4 [6183. 字符串的前缀分数和](https://leetcode.cn/problems/sum-of-prefix-scores-of-strings/)，官方难度为困难。 如果你熟悉前缀树，能想到这道题用前缀树的话就简单了。
                `,
        lectureUrl: '/solutionDetail?type=2&id=4001&max_id=4008',
        issueUrl: 'https://github.com/leetcode-pp/homework/issues/9'
      },
      {
        title: '进阶篇作业：《并查集》',
        desc: `
        本节的作业是第 223 场周赛的 T3 [1722. 执行交换操作后的最小汉明距离](https://leetcode.cn/problems/minimize-hamming-distance-after-swap-operations/)，官方难度为中等。 如果你熟悉并查集，能想到这道题用并查集的话就简单了。
                `,
        lectureUrl: '/solutionDetail?type=2&id=4002&max_id=4002',
        issueUrl: 'https://github.com/leetcode-pp/homework/issues/11'
      },
      {
        title: '进阶篇作业：《堆》',
        desc: `
        参考 [6170. 会议室 III](https://leetcode.cn/problems/meeting-rooms-iii/)
                `,
        lectureUrl: '/solutionDetail?type=2&id=4005&max_id=4008',
        issueUrl: 'https://github.com/leetcode-pp/homework/issues/7'
      }
    ]
  },
  basicLectures: [
    {
      title: '01. 数组，栈，队列',
      desc: '主要介绍了数组，栈，队列基本原理，基础 API 以及其对应的复杂度',
      image: {
        url: 'https://p.ipic.vip/1tsrna.jpg'
      },
      id: 1
    },
    {
      title: '02. 链表',
      desc:
        '主要介绍了链表基本原理，基础 API 以及其对应的复杂度，另外还列举了链表的常见考点和题型',
      image: {
        url: 'https://p.ipic.vip/sp82rf.jpg'
      },
      id: 2
    },
    {
      title: '03. 树',
      desc:
        '主要介绍了树的基本原理，遍历方式以及题型。递归的使用，递归与树的结合等。',
      image: {
        url:
          'https://cdn.jsdelivr.net/gh/wylu/cdn/post/Algorithm/Tree/%E4%BA%8C%E5%8F%89%E6%A0%91/preorder-traversal.gif'
      },
      id: 3
    },
    {
      title: '04. 哈希表',
      desc:
        '主要介绍了哈希表基本原理，基础 API ，处理冲突的方式以及其对应的复杂度，最后介绍了哈希表的常见题型和套路',
      image: {
        url: 'https://p.ipic.vip/racwhd.jpg'
      },
      id: 4
    },
    {
      title: '05. 双指针',
      desc: '主要介绍了双指针的基本概念，题型以及实际操作技巧。',
      image: {
        url: 'https://p.ipic.vip/37hxg3.jpg'
      },
      id: 5
    },
    {
      title: '06. 图',
      desc: '主要介绍了图基本原理，表示方式，常见算法。',
      image: {
        url: 'https://p.ipic.vip/oepxsy.jpg'
      },
      id: 6
    },
    {
      title: '07. 模拟，枚举与递推',
      desc: '主要介绍了模拟，枚举与递推这三种基本的编程技巧。',
      image: {
        url: 'https://p.ipic.vip/oepxsy.jpg'
      },
      id: 7
    },
    {
      title: '08. 排序',
      desc: '基本排序算法，以及它们的思想是什么',
      image: {
        url: 'https://p.ipic.vip/h4721s.jpg'
      },
      id: 8
    }
  ],
  introLectures: [
    {
      title: '01. 数据结构与算法概述',
      desc: '主要介绍了数据结构与算法是在研究什么',
      image: {
        url:
          'https://cdn.jsdelivr.net/gh/azl397985856/cdn/2020-10-22/1603338453129-image.png'
      },
      id: -5
    },
    {
      title: '02. 如何衡量算法的性能',
      desc: '介绍复杂度',
      image: {
        url:
          'https://cdn.jsdelivr.net/gh/azl397985856/cdn/2020-10-22/1603339778900-image.png'
      },
      id: -4
    },
    {
      title: '03. 如何使用好仓库',
      desc: '仓库使用指南',
      image: {
        url: 'https://p.ipic.vip/qltqzt.jpg',
        alt: '仓库使用指南'
      },
      id: -3,
      external: true,
      externalLink: 'https://www.bilibili.com/video/av627510315'
    },
    {
      title: '04. 如何高效刷题',
      desc: '方法和技巧介绍',
      image: {
        url: 'https://p.ipic.vip/g5r985.jpg',
        alt: '方法和技巧介绍'
      },
      id: -2,
      external: true,
      externalLink: 'https://www.bilibili.com/video/av670114626'
    },
    {
      title: '05. 力扣刷题的正确姿势是什么？',
      desc: '方法+工具',
      image: {
        url: 'https://p.ipic.vip/t9t4e2.jpg',
        alt: '方法和技巧介绍'
      },
      id: -1
    }
  ],
  topicLectures: [
    {
      title: '01. 二分',
      desc: '主要介绍了二分的本质，类型以及常见的套路',
      image: {
        url: 'https://p.ipic.vip/g0mlg9.jpg'
      },
      id: 7
    },
    {
      title: '02. 滑动窗口',
      desc: '主要介绍了滑动的本质，类型以及常见的套路',
      image: {
        url: 'https://p.ipic.vip/z474q4.jpg'
      },
      id: 8
    },
    {
      title: '03. 搜索（BFS，DFS，回溯）专题',
      desc: '主要介绍了搜索的本质，类型以及常见的套路和解题模板',
      image: {
        url: 'https://p.ipic.vip/tctlra.jpg'
      },
      id: 9
    },
    {
      title: '04. 动态规划',
      desc: '主要介绍了动态规划的本质，常见类型以及常见的套路',
      image: {
        url: 'https://p.ipic.vip/8qhqsn.jpg'
      },
      id: 10
    },
    {
      title: '05. 背包',
      desc: '主要介绍了常见的背包问题及其对应套路',
      image: {
        url: 'https://p.ipic.vip/lzt4w7.jpg'
      },
      id: 11
    },
    {
      title: '06. 分治',
      desc: '主要介绍了分治的基本解题思路',
      image: {
        url: 'https://p.ipic.vip/jrcb3x.jpg'
      },
      id: 12
    },
    {
      title: '07. 贪心',
      desc: '主要介绍了贪心的常见问题',
      image: {
        url: 'https://p.ipic.vip/7itqpj.jpg'
      },
      id: 13
    },
    {
      title: '08. 位运算',
      desc: '主要介绍了位运算是什么，种类有哪些，这是状态压缩的基础。',
      image: {
        url: 'https://p.ipic.vip/xf91hn.jpg'
      },
      id: 14
    }
  ],
  advanceLectures: [
    {
      title: '01. Trie',
      desc:
        '主要介绍了 Trie 解决的问题，适用场景，以及如何自己动手实现一个 Trie',
      image: {
        url: 'https://p.ipic.vip/s2pbj5.jpg'
      },
      id: 15
    },
    {
      title: '02. 并查集',
      desc:
        '主要介绍了并查集解决的问题，适用场景，以及如何自己动手实现一个并查集',
      image: {
        url: 'https://p.ipic.vip/2avrij.jpg'
      },
      id: 16
    },
    {
      title: '03. 剪枝',
      desc: '主要介绍了什么是剪枝，以及如何运用剪枝技巧使得暴力法可以 AC',
      image: {
        url: 'https://p.ipic.vip/1kst3h.jpg'
      },
      id: 17
    },
    {
      title: '04. 字符串匹配（BF&RK&KMP）',
      desc: '主要介绍了字符串匹配的三种经典算法',
      image: {
        url: 'https://p.ipic.vip/huik66.jpg'
      },
      id: 18
    },
    {
      title: '05. 堆',
      desc: '主要介绍了堆的特点，解决的问题以及常见题型',
      image: {
        url: 'https://p.ipic.vip/x2pgw9.jpg'
      },
      id: 19
    },
    {
      title: '06. 跳表',
      desc: '主要介绍了跳表是什么，解决的问题',
      image: {
        url: 'https://p.ipic.vip/08bvxx.jpg'
      },
      id: 20
    },
    {
      title: '07. 线段树',
      desc: '线段树的本质是什么？解决了什么问题？核心思想以及代码是什么？',
      image: {
        url: 'https://p.ipic.vip/rlhvg8.jpg'
      },
      id: 21
    }
  ],
  teachers: [
    {
      title: '西法',
      homepage: 'https://github.com/azl397985856',
      avatar: 'https://p.ipic.vip/z6hr2b.jpg',
      description:
        'Github 40K star 的架构师，同时也是刷题插件 leetcode-cheatsheet 作者',
      modules: [
        {
          name: 'Python',
          color: '#87d068'
        },
        {
          name: '双指针',
          color: '#87d'
        }
      ]
    },
    {
      title: '宝石叔叔',
      description: '我也不知道，代码都是百度抄来的，复制过来怎么会有错误',
      homepage: 'https://github.com/unclegem',
      avatar: 'https://p.ipic.vip/pj3xjr.jpg',
      modules: [
        {
          name: '哈希表',
          color: '#f50'
        },
        {
          name: 'Java',
          color: 'cyan'
        }
      ]
    },
    {
      title: '表哥',
      homepage: 'https://feiker.xyz',
      avatar: 'https://p.ipic.vip/48ccpb.jpg',
      modules: [
        {
          name: 'JS',
          color: 'orange'
        },
        {
          name: '树',
          color: 'green'
        }
      ]
    },
    {
      title: '漾哥',
      avatar: 'https://p.ipic.vip/k2j4ld.jpg',
      homepage: 'https://github.com/suukii',
      modules: [
        {
          name: '链表',
          color: '#108ee9'
        },
        {
          name: 'JS',
          color: 'orange'
        },
        {
          name: 'Python',
          color: '#87d068'
        }
      ]
    },
    {
      title: '三天',
      description: '这只窑鸡太懒了，什么也没写',
      avatar: 'https://p.ipic.vip/edjbt8.jpg',
      homepage: 'https://github.com/threedayAAAAA',
      modules: [
        {
          name: 'JS',
          color: 'orange'
        },
        {
          name: '数组',
          color: '#333'
        }
      ]
    }
  ]
}
