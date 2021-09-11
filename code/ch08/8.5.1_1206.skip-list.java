class Skiplist {
  class SkipListNode {
      int val;
      int cnt;  // 当前val出现的次数
      SkipListNode[] levels;  // start from 0
      SkipListNode() {
          levels = new SkipListNode[MAX_LEVEL];
      }
  }

  private double p = 0.5;
  private int MAX_LEVEL = 16;
  private SkipListNode head;  // 头结点
  private int level;  // 
  private Random random;

  public Skiplist() {

      level = 0;  
      head = new SkipListNode();
      random = new Random();
  }

  public boolean search(int target) {
      SkipListNode curNode = head;
      for (int i = level-1; i >= 0; i--) {
          while (curNode.levels[i] != null && curNode.levels[i].val < target) {
              curNode = curNode.levels[i];
          }
      }
      curNode = curNode.levels[0];
      return (curNode != null && curNode.val == target);
  }

  public void add(int num) {
      SkipListNode curNode = head;
      // 记录每层能访问的最右节点
      SkipListNode[] levelTails = new SkipListNode[MAX_LEVEL];
      for (int i = level-1; i >= 0; i--) {
          while (curNode.levels[i] != null && curNode.levels[i].val < num) {
              curNode = curNode.levels[i];
          }
          levelTails[i] = curNode;
      }
      curNode = curNode.levels[0];
      if (curNode != null && curNode.val == num) {
          // 已存在，cnt 加1
          curNode.cnt++;
      } else {
          // 插入
          int newLevel = randomLevel();
          if (newLevel > level) {
              for (int i = level; i < newLevel; i++) {
                  levelTails[i] = head;
              }
              level = newLevel;
          }
          SkipListNode newNode = new SkipListNode();
          newNode.val = num;
          newNode.cnt = 1;
          for (int i = 0; i < level; i++) {
              newNode.levels[i] = levelTails[i].levels[i];
              levelTails[i].levels[i] = newNode;
              
          }
      }
  }

  private int randomLevel() {
      int level = 1;  
      while (random.nextDouble() < p && level < MAX_LEVEL) {
          level++;
      }
      return level > MAX_LEVEL ? MAX_LEVEL : level;
  }
  public boolean erase(int num) {
      SkipListNode curNode = head;
      // 记录每层能访问的最右节点
      SkipListNode[] levelTails = new SkipListNode[MAX_LEVEL];

      for (int i = level-1; i >= 0; i--) {
          while (curNode.levels[i] != null && curNode.levels[i].val < num) {
              curNode = curNode.levels[i];
          }
          levelTails[i] = curNode;
      }
      curNode = curNode.levels[0];
      if (curNode != null && curNode.val == num) {
          if (curNode.cnt > 1) {
              curNode.cnt--;
              return true;
          }
          for (int i = 0; i < level; i++) {
              if (levelTails[i].levels[i] != curNode) {
                  break;
              }
              levelTails[i].levels[i] = curNode.levels[i];
          }
          while (level > 0 && head.levels[level-1] == null) {
              level--;
          }
          return true;
      } 
      return false;
  }
}