#include <cstdio>

class Solution {
public:
  ListNode *rotateRight(ListNode *head, int k) {
    if (head == NULL || head->next == NULL) return head;
    ListNode *p1 = head, *res = NULL;
    int n = 1;
    while (p1 && p1->next) {
      p1 = p1->next;
      n += 1;
    }
    int cur = 1;
    ListNode *p2 = head;
    while (cur < n - k % n) {
      p2 = p2->next;
      cur += 1;
    }
    p1->next = head;
    res = p2->next;
    p2->next = NULL;
    return res;
  }
};
