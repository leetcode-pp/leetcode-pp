const int MAX_LEVEL=10;
class SkipNode{
public:
    int val;
    int level;
    SkipNode** next;
    SkipNode(int v,int l){
        val=v;
        level=l;
        next=new SkipNode*[l+1]();
    }
};

class Skiplist {
private:

public:
    SkipNode* head;
    int Listlevel;
    Skiplist() {
        head=new SkipNode(INT_MIN,MAX_LEVEL);
        Listlevel=0;
    }
    int getlevel(){
        int lev=0;
        while(lev<MAX_LEVEL && lev<=Listlevel && rand()<RAND_MAX/2){
            ++lev;                      //等级为lev的节点出现的概率为1/2^lev
        }
        if(Listlevel<lev)++Listlevel;   //如果新节点等级高于跳表等级，则跳表等级加一
        return lev;
    }
    bool search(int target) {
        SkipNode* sn=head;
        int ll=Listlevel;
        while(ll>=0){
            while(sn->next[ll]!=nullptr && sn->next[ll]->val<=target)sn=sn->next[ll];
            --ll;
        }
        if(sn->val==target)return true;
        return false;
    }
    
    void add(int num) {
        //if(search(num))return; //一开始我没注意可以增删重复数字，所以加了这一行
        SkipNode* sn=head;
        int lev=getlevel();
        int ll=Listlevel;
        SkipNode* nsn=new SkipNode(num,lev);
        while(ll>=0){
            while(sn->next[ll]!=nullptr && sn->next[ll]->val<num)sn=sn->next[ll];
            if(ll<=lev){
                nsn->next[ll]=sn->next[ll];
                sn->next[ll]=nsn;
            }
            --ll;
        }
    }
    
    bool erase(int num) {
        if(!search(num))return false;
        SkipNode* sn=head;
        SkipNode* dsn;
        int ll=Listlevel;
        while(ll>=0){
            while(sn->next[ll]!=nullptr && sn->next[ll]->val<num)sn=sn->next[ll];
            if(ll==0)dsn=sn->next[ll];
            if(sn->next[ll]!=nullptr && sn->next[ll]->val==num){
                sn->next[ll]=sn->next[ll]->next[ll];
            }
            --ll;
        }
        if(dsn->level==Listlevel){              //如果删除的节点等级为最高等级节点，
                                                //则检查是否为唯一最高等级节点,
                                                //如果是，那么跳表等级减一。
            if(head->next[Listlevel]==nullptr)--Listlevel;
        }
        return true;
    }
};