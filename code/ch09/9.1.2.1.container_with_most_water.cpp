class Solution {
public:
    int maxArea(vector<int>& height) {
        int res = 0;
        int area = 0;
        for (int i = 0; i < height.size() - 1; i++)
            for (int j = i + 1; j < height.size(); j++) {
                area = (j - i) * min(height[i], height[j]);
                if (area > res)
                    res = area;
            }
        
        return res;
    }
};
