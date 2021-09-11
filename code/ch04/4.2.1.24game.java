package ch04.code;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TwentyFourGame {
    List<List<Double>> permutationList = new ArrayList<>();

    // 9ms at best
    public boolean judgePoint24(int[] nums) {
        permuteUnique(nums);
        for (List<Double> permutation : permutationList) {
            if (compute(permutation))
                return true;
        }
        return false;
    }

    private boolean compute(List<Double> nums) {
        if (nums.size() == 1)
            return Math.abs(nums.get(0) - 24) <= 1e-6;

        for (int i = 0; i < nums.size() - 1; i++) {
            // compute possible result from + - * /
            List<Double> tmpResultList = new ArrayList<>();
            tmpResultList.add(nums.get(i) + nums.get(i + 1));
            tmpResultList.add(nums.get(i) - nums.get(i + 1));
            tmpResultList.add(nums.get(i) * nums.get(i + 1));
            if (nums.get(i + 1) != 0) {
                tmpResultList.add(nums.get(i) / nums.get(i + 1));
            }

            // replace nums[i] and nums[i+1] with the result
            // continue with the new list
            for (Double newNum : tmpResultList) {
                List<Double> newList = new ArrayList<>(nums);
                newList.set(i, newNum);
                newList.remove(i + 1);
                if (compute(newList))
                    return true;
            }
        }
        return false;
    }


    public void permuteUnique(int[] nums) {
        boolean[] visited = new boolean[nums.length];
        Arrays.sort(nums);
        backtracking(nums, new ArrayList<>(), visited);
    }

    private void backtracking(int[] nums, List<Double> tmp, boolean[] visited) {
        if (tmp.size() == nums.length) {
            permutationList.add(new ArrayList<>(tmp));
            return;
        }

        for (int i = 0; i < nums.length; i++) {
            if (visited[i])
                continue;
            // !visited[i - 1] 说明已经遍历完被撤销了状态记录
            if (i > 0 && nums[i] == nums[i - 1] && !visited[i - 1])
                continue;
            visited[i] = true;
            tmp.add((double) nums[i]);
            backtracking(nums, tmp, visited);

            visited[i] = false;
            tmp.remove(tmp.size() - 1);
        }
    }
}