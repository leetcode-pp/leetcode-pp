class Solution {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1, res = 0, area = 0;

        while (left < right) {
            area = Math.min(height[left], height[right]) * (right - left);
            res = Math.max(res, area);
            if (height[left] < height[right])
                left++;
            else
                right++;
        }
        return res;
    }
}