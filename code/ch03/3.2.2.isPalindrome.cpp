#include <cstdio>
#include <cstdlib>

class Solution {
public:
  bool isPalindrome(ListNode *head) {
    ListNode *pre = NULL;
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
      fast = fast->next->next;
      ListNode *next = slow->next;
      slow->next = pre;
      pre = slow;
      slow = next;
    }
    if (fast) slow = slow->next;
    while (slow) {
      if (slow->val != pre->val) return false;
      pre = pre->next;
      slow = slow->next;
    }
    return true;
  }
};
