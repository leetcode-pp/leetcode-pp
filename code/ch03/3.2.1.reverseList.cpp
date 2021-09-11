#include <cstdio>
#include <cstdlib>

class Solution {
public:
  ListNode *reverseList(ListNode *head) {
    if (!head) return NULL;
    ListNode *prev = NULL, *cur = head;
    while (cur) {
      cur->next = prev;
      prev = cur;
      cur = cur->next;
    }
    return prev;
  }
};
