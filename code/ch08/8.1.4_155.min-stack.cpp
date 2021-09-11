class MinStack {
    typedef long long ll;
public:
    ll topElem; 
    /** initialize your data structure here. */
    MinStack() {
    }

    void push(int x) {
        if(s.empty()) {
            minn = x;
            s.push(x-minn);  //(当前值x-最小值minn)进栈
        }
        else {
            s.push(x-minn);
            minn = x < minn ? x : minn;  //值得注意的是当栈顶元素<0,则说明栈顶元素就是minn
        }
    }
    
    void pop() {
        if(!s.empty()) {
            topElem = s.top();
            s.pop();
            //原来的值x-最小值minn = topElem
            //topElem<0,说明原来值x更小(原来的值就是现在的minn)，则现在的minn应该被更新minn-topElem
            if(topElem < 0) minn -= topElem;
        }
        return;
    }
    
    int top() {
        if(!s.empty()) {
            topElem = s.top();
        }
        if(topElem < 0) return minn; //说明topElem <0, 说明 x<minn, minn已经被更新为当栈顶x，栈顶元素就是minn
        return topElem+minn;
    }
    
    int getMin() {
        return minn;
    }
    private:
        ll minn;
        stack<ll>s;
};