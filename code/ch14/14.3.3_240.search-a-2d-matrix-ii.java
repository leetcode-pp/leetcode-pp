class Solution {
  private boolean binarySearch(int[][] matrix, int target, int start, boolean vertical) {
      int lo = start;
      int hi = vertical ? matrix[0].length-1 : matrix.length-1;

      while (hi >= lo) {
          int mid = (lo + hi)/2;
          if (vertical) { // searching a column
              if (matrix[start][mid] < target) {
                  lo = mid + 1;
              } else if (matrix[start][mid] > target) {
                  hi = mid - 1;
              } else {
                  return true;
              }
          } else { // searching a row
              if (matrix[mid][start] < target) {
                  lo = mid + 1;
              } else if (matrix[mid][start] > target) {
                  hi = mid - 1;
              } else {
                  return true;
              }
          }
      }

      return false;
  }

  public boolean searchMatrix(int[][] matrix, int target) {
      // an empty matrix obviously does not contain `target`
      if (matrix == null || matrix.length == 0) {
          return false;
      }

      // iterate over matrix diagonals
      int shorterDim = Math.min(matrix.length, matrix[0].length);
      for (int i = 0; i < shorterDim; i++) {
          boolean verticalFound = binarySearch(matrix, target, i, true);
          boolean horizontalFound = binarySearch(matrix, target, i, false);
          if (verticalFound || horizontalFound) {
              return true;
          }
      }
      
      return false; 
  }
}