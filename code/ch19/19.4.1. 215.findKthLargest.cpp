#include <ctime>
#include <cstdlib>
#include <algorithm>
#include <vector>
using namespace std;

class Solution {
public:
  // find the idx-th smallest element
  // 0-th smallest element is the smallest globally
  // time complexity is O(n)
  int locate(vector<int>& arr,
      int st, int ed, int idx) {
    if (st == ed) return arr[st];

    // avoid the worst case
    int rd = st + rand() % (ed - st + 1);
    swap(arr[rd], arr[ed]);

    int now = st;
    for (int i = st; i < ed; i++)
      if (arr[i] < arr[ed]) swap(arr[i], arr[now++]);
    swap(arr[now], arr[ed]);
    if (now == st + idx) return arr[now];
    else if (now < st + idx)
      return locate(arr, now + 1, ed,
          idx - (now - st) - 1);
    else return locate(arr, st, now - 1, idx);
  }
  int findKthLargest(vector<int>& nums, int k){
    return locate(nums, 0, nums.size() - 1,
        nums.size() - k);
  }
};

