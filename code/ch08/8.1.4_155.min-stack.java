public class MinStack {
  long min;
  Stack<Long> stack;

  public MinStack(){
        stack=new Stack<>();
    }

  public void push(int x) {
    if (stack.isEmpty()) {
      min = x;
      stack.push(x - min);
    } else {
      stack.push(x - min);
      if (x < min){
        min = x; // 更新最小值
      }
        
    }
  }

  public void pop() {
    if (stack.isEmpty())
      return;

    long pop = stack.pop();
    
    //弹出的是负值，要更新 min
    if (pop < 0) {
      min = min - pop;
    }

  }

  public int top() {
    long top = stack.peek();
    //负数的话，出栈的值保存在 min 中
    if (top < 0) {
      return (int) (min);
        //出栈元素加上最小值即可
    } else {
      return (int) (top + min);
    }
  }

  public int getMin() {
    return (int) min;
  }
}