module.exports = {
  timeRange: {
    basic: ['2022/7/15', '2022/8/19'],
    topic: ['2022/8/20', '2022/9/24'],
    advanced: ['2022/9/25', '2022/10/13']
  },
  homeworks: {
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
        title: '基础篇作业二：《模拟，枚举与递推》',
        desc: `
         求 1 到 n 中所有整数 x 的 f(x) ，并以数组返回。其中
                  f(x) 指的是 x 的 2 的因子个数。 比如 f(6) = 1 ，因为 6 = 2 *
                  3，只有一个因子 2 。 f(4) = 2 ，因为 4 = 2 * 2，有两个因子 2
                  。
        `,
        lectureUrl: '/solutionDetail?type=2&id=2007&max_id=2008',
        issueUrl: 'https://github.com/leetcode-pp/homework/issues/1'
      }
    ],
    topic: [
      {
        title: '专题篇作业一：《二分查找》',
        desc: `
参考 2258. 逃离火灾(https://leetcode-cn.com/problems/escape-the-spreading-fire/)
        `,
        lectureUrl: '/solutionDetail?type=2&id=3001&max_id=3008',
        issueUrl: 'https://github.com/leetcode-pp/homework/issues/3'
      },
      {
        title: '专题篇作业二：《搜索》',
        desc: `
        参考 最便宜的公交路线(https://binarysearch.com/problems/Cheapest-Bus-Route)
                `,
        lectureUrl: '/solutionDetail?type=2&id=3003&max_id=3008',
        issueUrl: 'https://github.com/leetcode-pp/homework/issues/4'
      },
      {
        title: '专题篇作业三：《动态规划》',
        desc: `
        参考 [1770. 执行乘法运算的最大分数](https://leetcode.cn/problems/maximum-score-from-performing-multiplication-operations/)
                `,
        lectureUrl: '/solutionDetail?type=2&id=3004&max_id=3008',
        issueUrl: 'https://github.com/leetcode-pp/homework/issues/6'
      },
      {
        title: '专题篇作业四：《分治》',
        desc: `
        参考 [4. 寻找两个正序数组的中位数](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)
                `,
        lectureUrl: '/solutionDetail?type=2&id=3006&max_id=3008',
        issueUrl: 'https://github.com/leetcode-pp/homework/issues/5'
      }
    ],
    //
    advanced: [
      {
        title: '进阶篇作业：《堆》',
        desc: `
        参考 [6170. 会议室 III](https://leetcode.cn/problems/meeting-rooms-iii/)
                `,
        lectureUrl: '/solutionDetail?type=2&id=4005&max_id=4008',
        issueUrl: 'https://github.com/leetcode-pp/homework/issues/7'
      },
      {
        title: '进阶篇作业：《位运算》',
        desc: `
        如何求解一个数字 n 的 x 进制表示是多少? 比如数字 4 的二进制表示为 10，就返回字符串 "10"。`,
        lectureUrl: '/solutionDetail?type=2&id=4008&max_id=4008',
        issueUrl: 'https://github.com/leetcode-pp/homework/issues/8',
        answer: `
        s = ""
        while n:
            s = s + str(n % x) # 取 x 进制的最后一位
            n = n // x # x 进制下，移动一位
        `
      }
    ]
  },
  basicLectures: [
    {
      title: '01. 数组，栈，队列',
      desc: '主要介绍了数组，栈，队列基本原理，基础 API 以及其对应的复杂度',
      image: {
        url:
          'https://tva1.sinaimg.cn/large/007S8ZIlly1gfbikq9ipmj30cd0a73yp.jpg'
      },
      id: 1
    },
    {
      title: '02. 链表',
      desc:
        '主要介绍了链表基本原理，基础 API 以及其对应的复杂度，另外还列举了链表的常见考点和题型',
      image: {
        url:
          'https://tva1.sinaimg.cn/large/007S8ZIlly1gfigbvzje1j30ky0bhq3x.jpg'
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
        url:
          'https://tva1.sinaimg.cn/large/007S8ZIlly1gjurye2oxyj30zk0cymz7.jpg'
      },
      id: 4
    },
    {
      title: '05. 双指针',
      desc: '主要介绍了双指针的基本概念，题型以及实际操作技巧。',
      image: {
        url:
          'https://tva1.sinaimg.cn/large/007S8ZIlly1gf5w79tciyj30aa0hl77b.jpg'
      },
      id: 5
    },
    {
      title: '06. 图',
      desc: '主要介绍了图基本原理，表示方式，常见算法。',
      image: {
        url:
          'https://tva1.sinaimg.cn/large/0081Kckwly1gk3qh59semj30ec05ptab.jpg'
      },
      id: 6
    },
    {
      title: '07. 模拟，枚举与递推',
      desc: '主要介绍了模拟，枚举与递推这三种基本的编程技巧。',
      image: {
        url:
          'https://tva1.sinaimg.cn/large/0081Kckwly1gk3qh59semj30ec05ptab.jpg'
      },
      id: 7
    },
    {
      title: '08. 排序',
      desc: '基本排序算法，以及它们的思想是什么',
      image: {
        url:
          'https://tva1.sinaimg.cn/large/008i3skNly1gwzne4sdw7j31hc0u0gnc.jpg'
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
      id: -4
    },
    {
      title: '02. 如何衡量算法的性能',
      desc: '介绍复杂度',
      image: {
        url:
          'https://cdn.jsdelivr.net/gh/azl397985856/cdn/2020-10-22/1603339778900-image.png'
      },
      id: -3
    },
    {
      title: '03. 如何使用好仓库',
      desc: '仓库使用指南',
      image: {
        url:
          'https://tva1.sinaimg.cn/large/008eGmZEly1gomv0rscf4j31c00u0adk.jpg',
        alt: '仓库使用指南'
      },
      id: -2,
      external: true,
      externalLink: 'https://www.bilibili.com/video/av627510315'
    },
    {
      title: '04. 如何高效刷题',
      desc: '方法和技巧介绍',
      image: {
        url:
          'https://tva1.sinaimg.cn/large/008eGmZEly1gomv0r0f1ej30zk0k0tac.jpg',
        alt: '方法和技巧介绍'
      },
      id: -1,
      external: true,
      externalLink: 'https://www.bilibili.com/video/av670114626'
    }
  ],
  topicLectures: [
    {
      title: '01. 二分',
      desc: '主要介绍了二分的本质，类型以及常见的套路',
      image: {
        url:
          'https://tva1.sinaimg.cn/large/008eGmZEly1goss2vq59dj30c407rgm0.jpg'
      },
      id: 7
    },
    {
      title: '02. 滑动窗口',
      desc: '主要介绍了滑动的本质，类型以及常见的套路',
      image: {
        url:
          'https://tva1.sinaimg.cn/large/007S8ZIlly1ghlugl94y8j30d90d50t5.jpg'
      },
      id: 8
    },
    {
      title: '03. 搜索（BFS，DFS，回溯）专题',
      desc: '主要介绍了搜索的本质，类型以及常见的套路和解题模板',
      image: {
        url:
          'https://tva1.sinaimg.cn/large/0081Kckwly1gkaub4scgij30uu0io40h.jpg'
      },
      id: 9
    },
    {
      title: '04. 动态规划',
      desc: '主要介绍了动态规划的本质，常见类型以及常见的套路',
      image: {
        url:
          'https://tva1.sinaimg.cn/large/008i3skNly1gwznrig71zj30kc0ax752.jpg'
      },
      id: 10
    },
    {
      title: '05. 背包',
      desc: '主要介绍了常见的背包问题及其对应套路',
      image: {
        url:
          'https://tva1.sinaimg.cn/large/008i3skNly1gwzns35za2j30m80m8dh3.jpg'
      },
      id: 11
    },
    {
      title: '06. 分治',
      desc: '主要介绍了分治的基本解题思路',
      image: {
        url:
          'https://tva1.sinaimg.cn/large/008i3skNly1gwznt25ptij30m80le75n.jpg'
      },
      id: 12
    },
    {
      title: '07. 贪心',
      desc: '主要介绍了贪心的常见问题',
      image: {
        url:
          'https://tva1.sinaimg.cn/large/008i3skNly1gwznurrnszj30dw096aai.jpg'
      },
      id: 13
    },
    {
      title: '08. 位运算',
      desc: '主要介绍了位运算是什么，种类有哪些，这是状态压缩的基础。',
      image: {
        url:
          'https://tva1.sinaimg.cn/large/008i3skNly1gwznv5azddj30pc0bc74p.jpg'
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
        url:
          'https://tva1.sinaimg.cn/large/007S8ZIlly1ghlug87vyfj30mz0gq406.jpg'
      },
      id: 15
    },
    {
      title: '02. 并查集',
      desc:
        '主要介绍了并查集解决的问题，适用场景，以及如何自己动手实现一个并查集',
      image: {
        url:
          'https://tva1.sinaimg.cn/large/008i3skNly1gpzcws8miqj30dh053glo.jpg'
      },
      id: 16
    },
    {
      title: '03. 剪枝',
      desc: '主要介绍了什么是剪枝，以及如何运用剪枝技巧使得暴力法可以 AC',
      image: {
        url:
          'https://tva1.sinaimg.cn/large/008i3skNly1gpzcxvawtdj30qb0bjq41.jpg'
      },
      id: 17
    },
    {
      title: '04. 字符串匹配（BF&RK&KMP）',
      desc: '主要介绍了字符串匹配的三种经典算法',
      image: {
        url:
          'https://tva1.sinaimg.cn/large/008i3skNly1gpzd084vk4j314o0hutaz.jpg'
      },
      id: 18
    },
    {
      title: '05. 堆',
      desc: '主要介绍了堆的特点，解决的问题以及常见题型',
      image: {
        url:
          'https://tva1.sinaimg.cn/large/008i3skNly1gpzcyng27aj30dt0f33yy.jpg'
      },
      id: 19
    },
    {
      title: '06. 跳表',
      desc: '主要介绍了跳表是什么，解决的问题',
      image: {
        url:
          'https://tva1.sinaimg.cn/large/008i3skNly1gpzcyzany9j31u90u0n14.jpg'
      },
      id: 20
    },
    {
      title: '07. 线段树',
      desc: '线段树的本质是什么？解决了什么问题？核心思想以及代码是什么？',
      image: {
        url:
          'https://tva1.sinaimg.cn/large/008i3skNly1gwynoe1xm5j30u00vvgnl.jpg'
      },
      id: 21
    }
  ],
  teachers: [
    {
      title: '西法',
      homepage: 'https://github.com/azl397985856',
      avatar:
        'https://tva1.sinaimg.cn/large/008i3skNly1gpy3e38277j30cs0csjso.jpg',
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
      avatar:
        'https://tva1.sinaimg.cn/large/008i3skNly1gpy65g2jf2j316g0u0dz2.jpg',
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
      avatar:
        'https://tva1.sinaimg.cn/large/008i3skNly1gpy68il2fmj30rw0ru0t8.jpg',
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
      avatar:
        'https://tva1.sinaimg.cn/large/008i3skNly1gpy7a1u5rtj30cs0csglt.jpg',
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
      avatar:
        'https://tva1.sinaimg.cn/large/008i3skNly1gpy7afqfzmj30qn0qnt98.jpg',
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
