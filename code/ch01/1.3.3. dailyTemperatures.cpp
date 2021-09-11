class Solution {
public:
  vector<int> dailyTemperatures(vector<int> &T) {
    stack<int> st;
    vector<int> ans(T.size(), 0);
    for (int i = 0; i < T.size(); i++) {
      while (!st.empty() && T[i] > T[st.top()]) {
        int top = st.top();
        st.pop();
        ans[top] = i - top;
      }
      st.push(i);
    }
    return ans;
  }
};