/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    bool hasCycle(ListNode *head) {
        unordered_set<ListNode *> seenNode;
        while (head) {
            if (seenNode.find(head) != seenNode.end())
                return true;
            seenNode.insert(head);
            head = head->next;
        }
        return false;  
    }
};
