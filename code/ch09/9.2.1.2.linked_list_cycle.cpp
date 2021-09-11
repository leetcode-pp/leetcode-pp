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
        if(head == NULL || head->next == NULL)
            return false;
        
        ListNode *p1List = head;
        ListNode *p2List = head;
        
        while(p2List != NULL && p2List->next != NULL){
            p1List = p1List->next;
            p2List = p2List->next->next;
            
            if (p1List == p2List)
                return true;
        }
        
        return false;
    }
};
