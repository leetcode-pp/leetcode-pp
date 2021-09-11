class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        if (k == 1)
            return nums;
        int[] res = new int[nums.length - k + 1];

        Deque<Integer> queue = new LinkedList<>();

        for (int i = 0; i < nums.length; i++) {
            // 从尾部开始移除比新加入元素小的元素
            while (!queue.isEmpty() && nums[queue.getLast()] < nums[i])
                queue.removeLast();
            // 将新加入元素添加到双端队列的尾部
            queue.addLast(i);
            // 如过窗口外的元素仍然在双端队列中，将其移除
            if (queue.getFirst() == i - k)
                queue.removeFirst();
            // 将头部元素即当前最大元素对应的数字放入结果数组
            if (i - k + 1 >= 0)
                res[i - k + 1] = nums[queue.getFirst()];
        }

        return res;
    }
}